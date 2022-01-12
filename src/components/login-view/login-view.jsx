import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import PropTypes from "prop-types";

//Bootstrap Elements
import { Form, Button } from "react-bootstrap";

import "./login-view.scss";
import Logo from "url:../../../public/myflix-logo.png";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    let isValid = formValidation;
    // Send a request to the server for Authentication
    if (isValid) {
      axios
        .post("https://movies-api-db.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
          alert("Please enter a valid username or password.");
        });
    }
  };

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let isValid = true;
    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be more than 5 characters.";
      isValid = false;
    }
    if (password.trim().length < 3) {
      passwordError.passwordMissing =
        "You must enter a password (minimum 4 characters)";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
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

      <div className="Login">
        <Form>
          <h2>Log into your myFlix account.</h2>
          <div className="form-group">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="text">Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
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
              <Form.Label className="text">Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
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
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Sign in
            </Button>
            <span className="register">
              New to MyFlix? <Link to="/register">Join now</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};

export default connect(mapStateToProps, { setUser })(LoginView);