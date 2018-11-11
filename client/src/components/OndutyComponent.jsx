import React, { Component } from "react";
import { Link } from "react-router-dom";    

class OndutyComponent extends Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3">
                <Link to="#test1">Test 1</Link>
              </li>
              <li class="tab col s3">
                <Link to="#test2">
                  Test 2
                </Link>
              </li>
              <li class="tab col s3 disabled">
                <Link to="#test3">Disabled Tab</Link>
              </li>
              <li class="tab col s3">
                <Link to="#test4">Test 4</Link>
              </li>
            </ul>
          </div>
          <div id="test1" class="col s12">
            Test 1
          </div>
          <div id="test2" class="col s12">
            Test 2
          </div>
          <div id="test3" class="col s12">
            Test 3
          </div>
          <div id="test4" class="col s12">
            Test 4
          </div>
        </div>
      </div>
    );
  }
}

export default OndutyComponent;
