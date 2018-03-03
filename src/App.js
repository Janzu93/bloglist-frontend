import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import BlogList from './components/blogList'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user, notification: `Olet kirjautunut käyttäjänä ${user.username}` })
    } catch (exception) {
      this.setState({ error: 'Virheellinen käyttäjätunnus tai salasana' })
    }
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }



  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      url: this.state.newBlogUrl,
      author: this.state.newBlogAuthor
    }

    if (!blogObject.title || !blogObject.url) {
      this.setState({ error: 'Title ja Url kenttien pitää sisältää jotain' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
      return null
    }

    blogService.create(blogObject)
      .then(blogObject => this.setState({
        newBlogTitle: '',
        newBlogAuthor: '',
        newBlogUrl: '',
        blogs: this.state.blogs.concat(blogObject),
        error: 'Blogin lisäys onnistui'
      }))
  }

  handleBlogFieldChange = (event) => {
    if (event.target.name === 'newBlogTitle') {
      this.setState({ newBlogTitle: event.target.value })
    }
    if (event.target.name === 'newBlogAuthor') {
      this.setState({ newBlogAuthor: event.target.value })
    }
    if (event.target.name === 'newBlogUrl') {
      this.setState({ newBlogUrl: event.target.value })
    }
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    }
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }



  render() {
    return (
      <div>
        <Notification message={this.state.error} />
        {this.state.user === null ? <LoginForm username={this.state.username} password={this.state.password} handleSubmit={this.login} handleChange={this.handleLoginFieldChange} /> :
          <div>
            <p>{this.state.user.name} logged in </p><button onClick={() => window.localStorage.removeItem('loggedUser')}>logout</button>
            <BlogForm newBlogAuthor={this.state.newBlogAuthor}
              newBlogUrl={this.state.newBlogUrl}
              newBlogTitle={this.state.newBlogTitle}
              handleChange={this.handleBlogFieldChange}
              handleSubmit={this.addBlog} />
            <BlogList blogs={this.state.blogs}/>
          </div>
        }
      </div>
    )
  }
}

export default App;
