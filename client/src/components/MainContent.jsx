import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import MarkComponent from './MarkComponent';
import AttendanceComponent from './AttendanceComponent';
import OndutyComponent from './OndutyComponent';

class MainContent extends Component {
    render() {
        return (
            <div className="mainContent">

                <Switch>
                    <Route eaxct path="/student/marks" component={MarkComponent}/>
                    <Route eaxct path="/student/attendance" component={AttendanceComponent}/>
                    <Route eaxct path="/student/onduty" component={OndutyComponent}/>
                </Switch>
                
            </div>
        );
    }
}

export default MainContent;
