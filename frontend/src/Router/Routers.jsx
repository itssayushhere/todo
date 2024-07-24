import {  Route, Routes } from 'react-router-dom';
import { Goals } from '../Pages/Goals';
import { Welcome } from '../Pages/Welcome';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Home from '../Pages/Home/Home';
export const Routers = () => {
  return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  )
}
