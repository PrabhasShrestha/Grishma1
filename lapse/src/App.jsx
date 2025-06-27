import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import NavBar from './pages/components/NavBar';
import FormData from './pages/Form';
import { ListandKeys } from './pages/components/Buttons';
import { Toaster } from 'react-hot-toast';
import Footer from './pages/components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  const location = useLocation();
  const hideNavAndFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      <Toaster />
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/formdata" element={<FormData />} />
        <Route path="/listsandkeys" element={<ListandKeys />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

// Wrap App with Router since useLocation requires Router context
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;