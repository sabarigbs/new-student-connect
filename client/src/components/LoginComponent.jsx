import React, { Component } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import "materialize-css/dist/js/materialize.min.js";
import { withRouter } from 'react-router-dom';
import makeNetworkCall from "../services/networkCall";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role:"student"
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.roleToggler = this.roleToggler.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  roleToggler(event){
    if(event.target.checked)
      this.setState({role:"faculty"})
  }

  validateForm() {
    return true;
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
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          if (res.success) {
            this.props.history.push(`/${this.state.role}/marks`);
          }
        });
    }
  }

  render() {
    return (
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
              <input type="checkbox" onChange={this.roleToggler}/>
              <span className="lever"></span>
            </label>
          </div>
          <ButtonComponent
            className="btn"
            buttonText="Login"
            onClick={this.handleSubmitClick}
          />
          
        </form>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
