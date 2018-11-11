import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import makeNetworkCall from "../services/networkCall";

const localizer = Calendar.momentLocalizer(moment);

class AttendanceComponent extends Component {
  constructor(props) {
    super(props);
    this.getAttendance = this.getAttendance.bind(this);
    this.preprocessAttendance = this.preprocessAttendance.bind(this);
    this.state = {
      events: []
    };
  }

  getAttendance() {
    makeNetworkCall(`student/15CSR174/attendance`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => this.preprocessAttendance(res.data));
  }

  componentDidMount() {
    this.getAttendance();
  }

  preprocessAttendance(data){

    var events = [];
    
    data.forEach(day => {
        
        var morningFlag=false,eveningFlag=false;
        if(day.period1 === "ABSENT" || day.period2 === "ABSENT" || day.period3 === "ABSENT" || day.period4 === "ABSENT" ){  
          morningFlag = true;
        }
        if(day.period5 === "ABSENT" || day.period6 === "ABSENT" || day.period7 === "ABSENT"){
          eveningFlag = true;
        }

        if(morningFlag || eveningFlag){
            let object = {
                "start":day.date,
                "end":day.date,
                "title":"Absent"
            }
            events.push(object);
        }
        else{
            let object = {
                "start":day.date,
                "end":day.date,
                "title":"Present"
            }
            events.push(object);
        }

        
    });

    this.setState({events});
}

  render() {
    return (
      <div className="calendar">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          views={["month"]}
          defaultView="month"
          events={this.state.events}
          style={{ width: "60%", height: "70vh" }}
        />
      </div>
    );
  }
}

export default AttendanceComponent;
