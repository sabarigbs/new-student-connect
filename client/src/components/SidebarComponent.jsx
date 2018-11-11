import React, { Component } from "react";


class SidebarComponent extends Component {
  render() {
    return (
      <div className="sidebar hide-on-med-and-down">
        <div className = "profile-picture">
            <img src="../../images/profile.png" alt="profilePic"/>
        </div>
        <div className="sidebar-content">
            <div className="section">
                {this.props.name}
            </div>
            <div className="section">
                {this.props.id}    
            </div>
            <div className="section">
                {this.props.departmentName}    
            </div>
            <div className="section">
                {this.props.classId}
            </div>
            <div className="section">
                
            </div>
        </div>
      </div>
    );
  }
}

export default SidebarComponent;
