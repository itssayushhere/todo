import {  Route, Routes } from 'react-router-dom';
import { About } from '../Pages/About';
import { Home } from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import User from '../Pages/User';
export const Routers = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
  )
}
