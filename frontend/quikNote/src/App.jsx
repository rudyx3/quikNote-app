import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

const routes = (
  <Router>
    <Routes>
      <Route path="/notes" exact element={<Dashboard/>} />
      <Route path="/signup" exact element={<Signup/>} />
      <Route path="/" exact element={<Login/>} />
    </Routes>
  </Router>
);
function App() {

  return <>{routes}</>;
}

export default App;
