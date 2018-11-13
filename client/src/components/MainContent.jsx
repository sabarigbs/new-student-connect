import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import MarkComponent from './MarkComponent';
import AttendanceComponent from './AttendanceComponent';
import OndutyComponent from './OndutyComponent';
import FacultyMarkComponent from "./FacultyMarkComponent";
import FacultyAttendanceComponent from "./FacultyAttendanceComponent";
import FacultyOndutyComponent from "./FacultyOndutyComponent";

class MainContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            role : JSON.parse(localStorage.getItem("user")).role
        };
    }
    render() {
        let content;
        if(this.state.role === "student"){
            content = 
            <Switch>
                    <Route eaxct path="/student/marks" component={MarkComponent}/>
                    <Route eaxct path="/student/attendance" component={AttendanceComponent}/>
                    <Route eaxct path="/student/onduty" component={OndutyComponent}/>
                </Switch>
        }   
        else{
            content = <Switch>
            <Route eaxct path="/faculty/marks" component={FacultyMarkComponent}/>
            <Route eaxct path="/faculty/attendance" component={FacultyAttendanceComponent}/>
            <Route eaxct path="/faculty/onduty" component={FacultyOndutyComponent}/>
        </Switch>
        }
        return (
            <div className="mainContent">

                {content}
                
            </div>
        );
    }
}

export default MainContent;
