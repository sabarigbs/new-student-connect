import React, { Component } from "react";
import NavbarComponent from "./NavbarComponent";
import SidebarComponent from "./SidebarComponent";
import MainContent from "./MainContent";
import makeNetworkCall from "../services/networkCall";

class StudentLayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }

  getUserInfo = () => {
    var userId = "15CSR174";
    makeNetworkCall(`user/student/${userId}`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res.success) {
          this.setState({ userInfo: res.data });
        }
      });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    let student_id = this.state.userInfo.student_id;
    let student_name = this.state.userInfo.student_name;
    let department_name = this.state.userInfo.department_name;
    let class_id = this.state.userInfo.class_id;
  
    return (
      <div>
        <NavbarComponent />
        <SidebarComponent
          id={student_id}
          name={student_name}
          departmentName={department_name}
          classId={class_id}
        />
        <MainContent />
      </div>
    );
  }
}

export default StudentLayoutComponent;
