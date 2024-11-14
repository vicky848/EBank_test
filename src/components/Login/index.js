import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    se: false,
    em: '',
  }

  handleUserName = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  handlePasswordChange = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  success = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  fail = em => {
    this.setState({
      se: true,
      em,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  render() {
    const {userId, pin, se, em} = this.state

    const token = Cookies.get('jwt_token')

    if (token) {
      return <Redirect to="/" />
    }

    return (
      <>
        <Header />
        <div className="Login-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="form-container">
            <form className="form-item" onSubmit={this.handleSubmit}>
              <h1>Welcome Back!</h1>
              <div>
                <label className="label" htmlFor="userid">
                  User ID
                </label>
                <br />
                <input
                  type="text"
                  id="userid"
                  className="input-text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={this.handleUserName}
                />
              </div>
              <br />
              <div>
                <label className="label" htmlFor="pin">
                  PIN
                </label>
                <br />
                <input
                  type="password"
                  id="pin"
                  className="password"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={this.handlePasswordChange}
                />
              </div>
              <br />
              <button className="button-action" type="submit">
                Login
              </button>
              <div className="error">
                {se === true && <p className="error-text">{em}</p>}
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Login)
