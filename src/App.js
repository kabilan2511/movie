import "./App.css";
import Login from "./Components/LoginForm/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
