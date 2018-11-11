import React, { Component } from 'react';

class InputComponent extends Component {
    render() {
        return (
            <div className = "input-field">
                <input
                id={this.props.id}
                    className = {this.props.className}
                    type = {this.props.type}
                    placeholder = {this.props.placeholder}
                    onChange = {this.props.onChange}
                />
                <label htmlFor={this.props.id}>{this.props.labelName}</label>
            </div>
        );
    }
}

export default InputComponent;
