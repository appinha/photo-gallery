import React, { useState } from "react";
import { API_URL } from "../constants";
import saveUserToken from "../utils/saveUserToken";
import { Screen, useNavigation } from "../navigator";
import Logo from "../components/Logo";
import Input from "../components/Input";
import "./LoginScreen.css";

export default function LoginScreen() {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.length === 0 && password.length === 0)
      return setPasswordError("Please provide a username and password");

    if (username.length === 0) return setUsernameError("Please provide a username");

    if (password.length === 0) return setPasswordError("Please provide a password");

    fetch(`${API_URL}/users/sign-in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        return res;
      })
      .then((res) => {
        if (res.token && res.token.length > 0) {
          saveUserToken(res.token);
          navigate(Screen.Gallery);
        } else if (res.status === 401) {
          setPasswordError("Incorrect username or password");
        } else {
          throw new Error("Server error");
        }
      })
      .catch(() => {
        setPasswordError("Something went wrong, try again later");
      });
  };

  const usernameInput = (
    <Input
      title="Username"
      value={username}
      placeholder="Enter your username here"
      setValue={setUsername}
      errorText={usernameError}
      setErrorText={setUsernameError}
      data-testid="usernameInput"
    />
  );

  const passwordInput = (
    <Input
      title="Password"
      type={"password"}
      value={password}
      placeholder="Enter your password here"
      setValue={setPassword}
      errorText={passwordError}
      setErrorText={setPasswordError}
      data-testid="passwordInput"
    />
  );

  return (
    <div id="loginScreen">
      <div>
        <Logo />
        <h1>Sign in to your account</h1>

        <form onSubmit={onSubmit}>
          <div className="formContainer">
            {usernameInput}
            {passwordInput}
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
