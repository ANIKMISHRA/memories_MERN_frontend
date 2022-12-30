// Npm Packages
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// components
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

import { Container } from "@material-ui/core";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to='/posts' />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/auth' element={( !user ? <Auth /> : <Navigate to="/posts" />)} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
