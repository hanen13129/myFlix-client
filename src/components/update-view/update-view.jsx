import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

import "./update-view.scss";

export function UpdateView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [BirthdayError, setBirthdayError] = useState({});

  // Form validation
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

  // Update profile
  const updateDetails = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    const isValid = formValidation();
    if (isValid) {
      axios
        .put(
          `https://movies-api-db.herokuapp.com/users/${user}`,
          {
            Username: username,
            Email: email,
            Birthday: birthday,
            Password: password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          localStorage.setItem("user", data.Username);
          // console.log(data);
          alert(user + " has been updated.");
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("error updating the user");
          console.log(error.response.data);
        });
    }
  };

  return (
    <Container className="my-3 w-50 p-3">
      <h1>Edit Profile</h1>
      <br />

      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
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

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
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

        

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="MM/DD/YYYY"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
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

        <Button
          className="btn-primary font-weight-bold"
          type="submit"
          onClick={updateDetails}
        >
          Update
        </Button>
      </Form>
    </Container>
  );
}