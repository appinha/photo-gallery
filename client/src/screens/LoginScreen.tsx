import React, { useState } from 'react';
import Logo from '../components/Logo';
import Input from '../components/Input';
import './LoginScreen.css';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.length === 0 && password.length === 0)
      return setPasswordError("Please provide a username and password")

    if (username.length === 0)
      return setUsernameError("Please provide a username")

    if (password.length === 0)
      return setPasswordError("Please provide a password")

    if (username === "admin" && password === "123" )
      console.log("Signin authorized")
  };

  const usernameInput = <Input
    title="Username"
    value={username}
    placeholder="Enter your username here"
    setValue={setUsername}
    errorText={usernameError}
    setErrorText={setUsernameError}
  />;

  const passwordInput = <Input
    title="Password"
    type={"password"}
    value={password}
    placeholder="Enter your password here"
    setValue={setPassword}
    errorText={passwordError}
    setErrorText={setPasswordError}
  />;

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