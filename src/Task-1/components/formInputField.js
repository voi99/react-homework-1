import React, { Component } from "react";

class formInputField extends Component {
  render() {
    return (
      <div>
        <i className={this.props.icon}></i>
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.handleChange}
          className={this.props.class}
        />
        <div className="firstTaskErrorText">{this.props.errorMessage}</div>
      </div>
    );
  }
}

export default formInputField;
