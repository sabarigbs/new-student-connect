import React, { Component } from "react";
import makeNetworkCall from "../services/networkCall";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery";

class FacultyAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: JSON.parse(localStorage.getItem("user")).userId,
      courses: [],
      courseId: "",
      date: "",
      attendance: [],
      viewFlag: false,
      insertFlag: false
    };
  }

  componentDidMount() {
    this.getCourses();
    M.Datepicker.init($(".datepicker"), {
      format: "yyyy-mm-dd",
      onClose: () => {
        this.setState({ date: document.getElementById("datepicker").value });
      }
    });
  }

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

  getAttendance = courseId => {
    this.setState({
      courseId: courseId,
      viewFlag:true
    });
    if (this.state.date === "") {
      alert("Please select a date");
      return;
    }
    makeNetworkCall(
      `faculty/${this.state.userId}/attendance/${this.state.courseId}?date=${
        this.state.date
      }`
    )
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res && res.success) {
          this.setState({
            attendance: res.data
          });
        }
      });
  };

  render() {
    let content;
    if (this.state.viewFlag) {
      content = (
        <div>
          <p className="center">
            Abseentes - {`${this.state.courseId} ( ${this.state.date} )`}
          </p>
          <table>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
            </tr>
            <tbody>
              {this.state.attendance.map(student => {
                return (
                  <tr>
                    <td>{student.student_id}</td>
                    <td>{student.student_name}</td>
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
        <div>
          <label htmlFor="datepicker">Choose a Date</label>
          <input type="text" id="datepicker" class="datepicker" />
          <table>
            <tbody>
              {this.state.courses.map(course => {
                return (
                  <tr>
                    <td>
                      <button
                        className="btn"
                        onClick={() => this.getAttendance(course.course_id)}
                      >
                        {`View ${course.course_name}`}
                      </button>
                    </td>
                    <td>
                      <button className="btn">
                        {`Insert ${course.course_name}`}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {content}
      </div>
    );
  }
}

export default FacultyAttendance;
