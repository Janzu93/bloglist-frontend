import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      blogs: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
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
        {this.state.user === null ? this.loginForm() :
          <div>
            <p>{this.state.user.name} logged in </p><button onClick={() => window.localStorage.removeItem('loggedUser')}>logout</button>
            {this.blogList()}
          </div>
        }
      </div>
    );
  }
}

export default App;
