import React, { Component } from "react";

class CollapsibleComponent extends Component {
  constructor(props) {
    super(props);
    this.constructTable = this.constructTable.bind(this);
    this.constructRows = this.constructRows.bind(this);
  }

  constructTable(cat){
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
            <button className="btn">Verify</button>
          </td>
          <td>
            <button className="btn red">Remarks</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    

    
    return (
      <div>
        <ul className="collapsible popout">
          <li>
            <div className="collapsible-header">
              Continuous Assessment Test 1
            </div>
            <div className="collapsible-body">{this.constructTable(this.props.marks.cat1)}</div>
          </li>
          <li>
            <div className="collapsible-header">
              Continuous Assessment Test 2
            </div>
            <div className="collapsible-body">{this.constructTable(this.props.marks.cat2)}</div>
          </li>
          <li>
            <div className="collapsible-header">
              Continuous Assessment Test 3
            </div>
            <div className="collapsible-body">{this.constructTable(this.props.marks.cat3)}</div>
          </li>
        </ul>
      </div>
    );
  }
}

export default CollapsibleComponent;
