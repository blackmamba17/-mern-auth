import React from 'react'

//importing the pages
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Profile from "./pages/Profile";
import Header from './components/Header';


//react router dom to route the pages
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
    //instead of a div i return a browserrouter object

    //think it like the app div
    <BrowserRouter>

      {/* header */}
      <Header />

      {/* the container */}
      <Routes>
        {/* the pages to route, think it like the a link tag */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
