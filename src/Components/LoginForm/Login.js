import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded login credentials (for demonstration purposes)
    const hardcodedUsername = "user";
    const hardcodedPassword = "pass";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      navigate("/Home");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <div className="form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-container">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="button-container">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
