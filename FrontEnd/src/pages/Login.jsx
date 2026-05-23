import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        placeholder="emaill"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button>LOGIN</button>
    </form>
  );
};

export default Login;
