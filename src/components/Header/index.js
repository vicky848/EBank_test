import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-item">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <button
        className="logout-button"
        onClick={handleLogout}
        type="button"
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
