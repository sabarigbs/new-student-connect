import React, { Component } from "react"; 
import { Route } from "react-router-dom"; 
import "materialize-css/dist/js/materialize.min.js";
import OndutyApplyComponent from "./OndutyApplyComponent";
import OndutyViewComponent from "./OndutyViewComponent";
import OndutyEditComponent from "./OndutyEditComponent";
import OndutyDeleteComponent from "./OndutyDeleteComponent";


class OndutyComponent extends Component {
  render() {
    return (
      <div>
        <Route path="/student/onduty/apply" component={OndutyApplyComponent}/>
        <Route path="/student/onduty/view" component={OndutyViewComponent}/>
        <Route path="/student/onduty/edit" component={OndutyEditComponent}/>
        <Route path="/student/onduty/delete" component={OndutyDeleteComponent}/>
      </div>
    );
  }
}

export default OndutyComponent;
