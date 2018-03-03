import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
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

  loginForm = () => (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={this.login}>
        <div>käyttäjätunnus:
        <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>salasana:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

  blogList = () => (
    <div>
      <h2>blogs</h2>
      {this.state.blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )

  blogForm = () => (
    <div>
      <h3>create new</h3>
      <form onSubmit={this.addBlog}>
        title: <input type="text" name="newBlogTitle" value={this.state.newBlogTitle} onChange={this.handleBlogFieldChange} />
        author:<input type="text" name="newBlogAuthor" value={this.state.newBlogAuthor} onChange={this.handleBlogFieldChange} />
        url: <input type="text" name="newBlogUrl" value={this.state.newBlogUrl} onChange={this.handleBlogFieldChange} />
        <button type="submit">uusi blogi</button>
      </form>
    </div>
  )

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
      return
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
        {this.state.user === null ? this.loginForm() :
          <div>
            <p>{this.state.user.name} logged in </p><button onClick={() => window.localStorage.removeItem('loggedUser')}>logout</button>
            {this.blogForm()}
            {this.blogList()}
          </div>
        }
      </div>
    )
  }
}

export default App;
