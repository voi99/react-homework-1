import React from "react";
import "./firstTask.css";

const initialState = {
  confirmPassword: "",
  userName: "",
  firstName: "",
  lastName: "",
  password: "",
  emailError: "",
  passwordError: "",
  userNameError: "",
  email: "",
};

export default class ValiationForm extends React.Component {
  state = initialState;

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let emailError = "";
    let userNameError = "";
    let lastNameError = "";
    let passwordError = "";
    let firstNameError = "";
    let confirmPasswordError = "";
    let emailregex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    let passwordRegEx =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
    if (!this.state.lastName) {
      lastNameError = "Last name cannot be blank";
    }
    if (!this.state.firstName) {
      firstNameError = "First name cannot be blank";
    }

    if (!this.state.userName) {
      userNameError = "username cannot be blank";
    } else if (6 > this.state.userName.length) {
      userNameError = "username is too Short";
    } else if (this.state.userName.length > 12) {
      userNameError = "username is too Long";
    }

    if (!emailregex.test(this.state.email)) {
      emailError = "invalid email";
      // ^[^@\s]+@[^@\s]+\.[^@\s]+$
    }
    if (!passwordRegEx.test(this.state.password)) {
      passwordError = "Password is too short";
    }
    if (this.state.password !== this.state.confirmPassword) {
      confirmPasswordError = "Password does not match";
    }
    if (
      emailError ||
      userNameError ||
      lastNameError ||
      firstNameError ||
      passwordError ||
      confirmPasswordError
    ) {
      this.setState({
        emailError,

        userNameError,
        lastNameError,
        passwordError,
        firstNameError,
        confirmPasswordError,
      });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      const formFields = {
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        email: this.state.email,
      };
      this.setState(initialState);
      fetch("https://jsonblob.com/api/jsonBlob", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          redirect: "follow",
        },
        body: JSON.stringify(formFields),
      })
        .then(function (response) {
          let blobUrl = response.headers.get("Location");
          console.log(blobUrl, "BLOB URL");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <form className="firstTaskForm" onSubmit={this.handleSubmit}>
        <div>
          <input
            name="userName"
            placeholder="UserName"
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.userNameError}
          </div>
        </div>
        <div>
          <input
            name="firstName"
            placeholder="FirstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.firstNameError}
          </div>
        </div>
        <div>
          <input
            name="lastName"
            placeholder="LastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.lastNameError}
          </div>
        </div>
        <div>
          <input
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.confirmPasswordError}
          </div>
        </div>
        <button type="submit">submit</button>
      </form>
    );
  }
}
