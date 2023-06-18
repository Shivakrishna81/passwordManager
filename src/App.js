import {Component} from 'react'
import {v4 as uid} from 'uuid'
import './App.css'

const coloredList = ['blue', 'orange', 'green', 'yellow', 'brown']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    isShow: false,
    isTrue: false,
  }

  websiteInput = event => {
    this.setState({website: event.target.value})
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classAdd = coloredList[Math.floor(Math.random() * 5)]

    const newPassword = {
      id: uid(),
      initial,
      classAdd,
      username,
      website,
      password,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      username: '',
      password: '',
      website: '',
      searchInput: '',
    }))
  }

  showPasswords = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    }
    this.setState({isShow: false})
  }

  searchInputValue = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const newPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: newPasswordList})
  }

  render() {
    const {passwordList, isShow, searchInput} = this.state
    let {isTrue} = this.state
    const lengths = passwordList.length
    const newList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="bg2">
          <form className="bg2-1">
            <h1 className="head">Add New Password</h1>
            <div className="input_holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="web-img"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.websiteInput}
              />
            </div>

            <div className="input_holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="web-img"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.usernameInput}
              />
            </div>

            <div className="input_holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="web-img"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.passwordInput}
              />
            </div>

            <button type="submit" onClick={this.onClickAdd}>
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password"
          />
        </div>
        <div className="bg3">
          <div className="bg3-t">
            <div className="yp">
              <h1 className="ypt">Your Passwords</h1>
              <p className="ypt">{lengths}</p>
            </div>
            <div className="input_holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="web-img"
              />
              <input
                type="search"
                className="input"
                onChange={this.searchInputValue}
                placeholder="search"
              />
            </div>
          </div>
          <hr />
          <div>
            <input type="checkbox" id="checked" onChange={this.showPasswords} />
            <label htmlFor="checked">Show Passwords</label>
          </div>
          {!isTrue && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="password"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul>
              {newList.map(each => (
                <li className="list_item" id={each.id} key={each.id}>
                  <p className={`round ${each.classAdd}`}>{each.initial}</p>
                  <div>
                    <p>{each.website}</p>
                    <p>{each.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{each.password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deletePassword(each.id)}
                    data-testid="delete"
                    className="button"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="web-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
