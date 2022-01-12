import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

//Bootstrap Elements
import { Form, Button } from "react-bootstrap";

import "./registration-view.scss";
import Logo from "url:../../../public/myflix-logo.png";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [birthdayError, setBirthdayError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios
        .post("https://movies-api-db.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
          alert("Thank you for registering!");
        })
        .catch((e) => {
          console.log("error registering the user");
        });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const emailError = {};
    const passwordError = {};
    const birthdayError = {};
    let isValid = true;
    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters.";
      isValid = false;
    } else if (password.trim().length < 4) {
      passwordError.passwordMissing = "Password must be at least 4 characters.";
      isValid = false;
    } else if (!email.includes(".") || !email.includes("@")) {
      emailError.emailNotEmail = "Please enter a valid email address.";
      isValid = false;
    } else if (birthday === "") {
      birthdayError.noBirthday = "Please enter your Birthday.";
      isValid = false;
    }
    setUsernameError(usernameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setBirthdayError(birthdayError);
    return isValid;
  };

  return (
    <div>
      <div className="header">
        <img
          src={Logo}
          className="d-inline-block align-top m-auto"
          height="100px"
          width="auto"
          alt="myFlix logo"
        />
      </div>

      <div className="Register">
        <Form>
          <h2>Create your myFlix account.</h2>
          <div className="form-group">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {Object.keys(usernameError).map((key) => {
                return (
                  <div key={key} style={{ color: "#1e81b0" }}>
                    {usernameError[key]}
                  </div>
                );
              })}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ color: "#1e81b0" }}>
                    {passwordError[key]}
                  </div>
                );
              })}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ color: "#1e81b0" }}>
                    {emailError[key]}
                  </div>
                );
              })}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                placeholder="MM/DD/YYYY"
                onChange={(e) => setBirthday(e.target.value)}
              />
              {Object.keys(birthdayError).map((key) => {
                return (
                  <div key={key} style={{ color: "#1e81b0" }}>
                    {birthdayError[key]}
                  </div>
                );
              })}
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <span className="login">
              Already have an account? <Link to="/">Sign in</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date,
  }),
};