import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div className="valign-wrapper">
        <div className="container">
          <h1 className="center">Error 404</h1>
          <h4 className="center"> Not Found!!!</h4>
          <p className="center">The page you are looking for doesn't exist</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
