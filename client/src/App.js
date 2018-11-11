import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import StudentLayoutComponent from "./components/StudentLayoutComponent";
import FacultyLayoutComponent from "./components/FacultyLayoutComponent";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component = {LoginComponent} />
            <Route path="/student/" component={StudentLayoutComponent} />
            <Route path="/faculty/" component={FacultyLayoutComponent} />
            <Route component={NotFound} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
