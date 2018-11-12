import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery";
import makeNetworkCall from "../services/networkCall";
import CollapsibleComponent from "./CollapsibleComponent";

class MarkComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rollno: JSON.parse(localStorage.getItem("user")).userId,
      marks:{
        cat1:[],
        cat2:[],
        cat3:[]
      }
    };

    this.fetchMarks = this.fetchMarks.bind(this);
  }

  fetchMarks(catName) {
    makeNetworkCall(`student/${this.state.rollno}/marks/${catName}`)
      .then(res => res.json())
      .catch(err => err)
      .then(res => {
        let marks = {...this.state.marks}
        if(catName === "18ODD1")
          marks.cat1 = res.marks;
        if(catName === "18ODD2")
          marks.cat2 = res.marks;
        if(catName === "18ODD3")
          marks.cat3 = res.marks;
        this.setState({marks});
        console.log(this.state.marks);
        
      });
  }

  componentDidMount() {
    M.Collapsible.init($(".collapsible"));
    this.fetchMarks("18ODD1");
    this.fetchMarks("18ODD2");
    this.fetchMarks("18ODD3");
  }

  render() {
    return (
      <div>
        <CollapsibleComponent marks={this.state.marks}/>
      </div>
    );
  }
}

export default MarkComponent;
