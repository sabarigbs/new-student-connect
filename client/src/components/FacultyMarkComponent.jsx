import React, { Component } from "react";
import makeNetworkCall from "../services/networkCall";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery";

class FacultyMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: JSON.parse(localStorage.getItem("user")).userId,
      courses: [],
      test: "",
      courseId: "",
      marks: [],
      viewFlag: false,
      insetFlag : false
    };
  }

  componentDidMount() {
    this.getCourses();
    M.FormSelect.init($("select"));
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      test: event.target.value
    });
  };

  getCourses = () => {
    makeNetworkCall(`faculty/${this.state.userId}/courses`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res && res.success) {
          this.setState({
            courses: res.data
          });
        }
      });
  };

  fetchMarks = courseId => {
    this.setState({
      courseId: courseId,
      viewFlag:true
    });
    if (this.state.test === "") {
      alert("Please choose the test");
      return;
    }

    makeNetworkCall(
      `faculty/${this.state.userId}/marks/18ODD${this.state.test}?course_id=${
        this.state.courseId
      }`
    )
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res && res.success) {
          this.setState({
            marks: res.data
          });
        }
      });
  };

  render() {
    let content;
    if (this.state.viewFlag) {
      content = (
        <div>
          <p className="center">{`Continuous Assessment Test ${
            this.state.test
          } - ${this.state.courseId}`}</p>
          <table class="striped">
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Marks</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {this.state.marks.map(mark => {
                return (
                  <tr>
                    <td>{mark.student_id}</td>
                    <td>{mark.student_name}</td>
                    <td>{mark.marks}</td>
                    <td>{mark.remarks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <div class="input-field col s6">
          <select onChange={this.handleChange}>
            <option disabled selected>
              Choose your option
            </option>
            <option value="1">Continuous Assessment Test 1</option>
            <option value="2">Continuous Assessment Test 2</option>
            <option value="3">Continuous Assessment Test 3</option>
          </select>
          <label>Choose Test</label>
        </div>
        {this.state.courses.map(subject => {
          return (
            <tr>
              <td>
                <button
                  className="btn"
                  key={subject.course_id}
                  onClick={() => {
                    this.fetchMarks(subject.course_id);
                  }}
                >
                  {`View ${subject.course_name}`}
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  key={subject.course_id}
                  onClick={() => {
                    this.fetchMarks(subject.course_id);
                  }}
                >
                  {`Insert ${subject.course_name}`}
                </button>
              </td>
            </tr>
          );
        })}
        {content}
      </div>
    );
  }
}

export default FacultyMark;
