import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import makeNetworkCall from "../services/networkCall";
import {withRouter} from "react-router-dom";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    M.Sidenav.init($(".sidenav"), { edge: "left" });
    M.Dropdown.init($(".dropdown-trigger"), { coverTrigger: false });
  }

  logout() {
    makeNetworkCall("logout")
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res.success) {
          this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">
                Logo
              </Link>
              <Link
                to="#"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <NavLink to="/student/marks">Marks</NavLink>
                </li>
                <li>
                  <NavLink to="/student/attendance">Attendace</NavLink>
                </li>
                <li>
                  <NavLink to="/student/onduty">Onduty</NavLink>
                </li>
                <li>
                  <a className="dropdown-trigger" data-target="dropdown1">
                    <i className="material-icons">settings</i>
                  </a>
                  <ul id="dropdown1" className="dropdown-content">
                    <li>
                      <a onClick={this.logout}>Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/student/marks">Marks</Link>
          </li>
          <li>
            <Link to="/student/attendance">Attendace</Link>
          </li>
          <li>
            <Link to="/student/onduty">Onduty</Link>
          </li>
          <li>
            <a onClick={this.logout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(NavbarComponent);
