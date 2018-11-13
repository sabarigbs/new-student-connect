import React, { Component } from "react";
import NavbarComponent from "./NavbarComponent";
import MainContent from "./MainContent";
import SidebarComponent from "./SidebarComponent";
import makeNetworkCall from "../services/networkCall";

class FacultyLayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: JSON.parse(localStorage.getItem("user")).userId,
      userInfo: {}
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    makeNetworkCall(`user/faculty/${this.state.userId}`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res && res.success) {
          this.setState({ userInfo: res.data });
        }
      });
  };

  render() {
    let faculty_id = this.state.userInfo.faculty_id;
    let faculty_name = this.state.userInfo.faculty_name;
    let department_name = this.state.userInfo.department_name;
   

    return (
      <div>
        <NavbarComponent />
        <SidebarComponent
          id={faculty_id}
          name={faculty_name}
          departmentName={department_name}
          
        />
        <MainContent />
      </div>
    );
  }
}

export default FacultyLayoutComponent;
