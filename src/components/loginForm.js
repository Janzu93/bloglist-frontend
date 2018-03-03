import React from 'react'

const loginForm = ({ handleSubmit, handleChange, username, password, loginVisible, loginVisibleChange }) => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={loginVisibleChange}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Kirjaudu</h2>
        <form onSubmit={handleSubmit}>
          <div>käyttäjätunnus:
      <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>salasana:
        <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
        <button onClick={loginVisibleChange}>cancel</button>
      </div>
    </div>
  )
}

export default loginForm