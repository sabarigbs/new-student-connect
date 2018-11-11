import React, { Component } from "react";

class ButtonComponent extends Component {
  render() {
    return (
      <div>
        <button
          className={this.props.className}
          id={this.props.id}
          onClick={this.props.onClick}
        >
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default ButtonComponent;
