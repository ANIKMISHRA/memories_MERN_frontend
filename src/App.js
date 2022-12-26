// Npm Packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

import { Container } from "@material-ui/core";

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
