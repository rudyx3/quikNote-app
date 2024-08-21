import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { ForgotPass } from "./Pages/ForgotPass";

const routes = (
  <Router>
    <Routes>
      <Route path="/notes" exact element={<Dashboard />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/" exact element={<Login />} />
      <Route path="/forgotpass" exact element={<ForgotPass />} />
    </Routes>
  </Router>
);
function App() {
  return <>{routes}</>;
}

export default App;
