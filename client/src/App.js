import React, { Component } from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import { PrivateRoute } from "./components/PrivateRoute";
import StudentLayoutComponent from "./components/StudentLayoutComponent";
import FacultyLayoutComponent from "./components/FacultyLayoutComponent";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render = {(props) => {
              console.log(JSON.parse(localStorage.getItem("user")));
              if(JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).isLoggedIn){
                var role = JSON.parse(localStorage.getItem("user")).role;
                return <Redirect to={`${role}/marks`}/>
              }
              else
                return <LoginComponent/>  
              }} />
            <PrivateRoute path="/student/" component={StudentLayoutComponent} />
            <PrivateRoute path="/faculty/" component={FacultyLayoutComponent} />
            <Route component={NotFound} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
