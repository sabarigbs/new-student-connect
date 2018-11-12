import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery";
import makeNetworkCall from "../services/networkCall";

class CollapsibleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks: "",
      markId: ""
    };
    this.modal = "";
    this.constructTable = this.constructTable.bind(this);
    this.constructRows = this.constructRows.bind(this);
  }

  handleInput = event => {
    this.setState({ remarks: event.target.value });
    console.log(this.state.remarks);
  };

  updateRemarks = event => {
    event.preventDefault();
    let markId = event.target.getAttribute("data");
    this.setState({
      markId: markId
    });
  };

  submitRemarks = event => {
    event.preventDefault();
    let body = {
      remarks: this.state.remarks
    };
    makeNetworkCall(`student/marks/${this.state.markId}`, "PUT", body)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if(res && res.success){
          M.Modal.getInstance($(".modal")).close();
          alert("Success!");
        }
      });
  };

  verifyMarks = (event) => {
    let markId = event.target.getAttribute("data");
    let body = {
      remarks: "Verified"
    }
    makeNetworkCall(`student/marks/${markId}`, "PUT", body)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if(res && res.success){
          M.Modal.getInstance($(".modal")).close();
          alert("Success!");
        }
      });
  }

  componentDidMount() {
    this.modal = M.Modal.init($(".modal"));
  }

  constructTable(cat) {
    return (
      <table className="striped">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Marks</th>
            <th>Verify</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>{this.constructRows(cat)}</tbody>
      </table>
    );
  }

  constructRows(cat) {
    return cat.map(res => {
      return (
        <tr key={res.mark_id}>
          <td>{res.course_id}</td>
          <td>{res.course_name}</td>
          <td>{res.marks}</td>
          <td>
            <button className="btn" data={res.mark_id} onClick={this.verifyMarks}>Verify</button>
          </td>
          <td>
            <button
              className="btn red modal-trigger"
              data-target="modal"
              data={res.mark_id}
              onClick={this.updateRemarks}
            >
              Remarks
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div id="modal" className="modal">
          <div className="modal-content">
            <form>
              <div className="input-field col s6">
                <input type="text" name="remarks" onChange={this.handleInput} />
                <label htmlFor="remarks">Remarks</label>
              </div>
              <div>
                <button
                  className="btn btn-center waves-effect waves-light"
                  onClick={this.submitRemarks}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <ul className="collapsible popout">
            <li>
              <div className="collapsible-header">
                Continuous Assessment Test 1
              </div>
              <div className="collapsible-body">
                {this.constructTable(this.props.marks.cat1)}
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                Continuous Assessment Test 2
              </div>
              <div className="collapsible-body">
                {this.constructTable(this.props.marks.cat2)}
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                Continuous Assessment Test 3
              </div>
              <div className="collapsible-body">
                {this.constructTable(this.props.marks.cat3)}
              </div>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default CollapsibleComponent;
