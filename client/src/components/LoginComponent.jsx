import React, { Component, Fragment } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import "materialize-css/dist/js/materialize.min.js";
import { withRouter } from "react-router-dom";
import makeNetworkCall from "../services/networkCall";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "student",
      errors: []
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.roleToggler = this.roleToggler.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  roleToggler(event) {

    if (event.target.checked) this.setState({ role: "faculty", errors:[]});
  }

  showAlert() {
    this.state.errors.forEach(
      error => (document.getElementById("alert").innerHTML += error)
    );
  }

  validateForm() {
    const { username, password, role } = this.state;
    var { errors } = this.state;
    if (username === "")
      errors.push("<li>Username is empty, Please enter a username</li>");
    if (role === "student" && username.length !== 8) errors.push("<li>Username Invalid!</li>");
    if (password === "")
      errors.push("<li>Password is empty, Please enter a password</li>");

    if (errors.length === 0) return true;
    else return false;
  }

  handleSubmitClick(event) {
    event.preventDefault();

    if (this.validateForm()) {
      let body = {
        username: this.state.username,
        password: this.state.password,
        role: this.state.role
      };
      let responseFromAPI = makeNetworkCall("login", "POST", body);
      responseFromAPI
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(res => {
          if (res && res.success) {
            window.localStorage.setItem(
              "user",
              JSON.stringify({
                isLoggedIn: true,
                userId: this.state.username,
                role: this.state.role
              })
            );
            this.props.history.push(`/${this.state.role}/marks`);
          }
        })
        .catch(err => console.log(err));
    } else {
      this.showAlert();
    }
  }

  render() {
    return (
      <Fragment>
        <div id="alert" />
        <div className="loginComponentWrapper">
          <form>
            <h5 className="center-align">Student Connect</h5>
            <InputComponent
              id="userNameInput"
              type="text"
              labelName="Username"
              onChange={this.handleUsernameChange}
            />
            <InputComponent
              id="passwordInput"
              type="password"
              labelName="Password"
              onChange={this.handlePasswordChange}
            />
            <div className="switch section">
              <label>
                Faculty
                <input type="checkbox" onChange={this.roleToggler} />
                <span className="lever" />
              </label>
            </div>
            <ButtonComponent
              className="btn"
              buttonText="Login"
              onClick={this.handleSubmitClick}
            />
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(LoginComponent);
