import {  Route, Routes } from 'react-router-dom';
import { About } from '../Pages/About';
import { Home } from '../Pages/Home';
export const Routers = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
  )
}
