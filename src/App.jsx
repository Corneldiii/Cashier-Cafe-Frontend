import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login"
import Menu from "./page/Menu"
import Sellings from './page/Sellings'

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path= "/Sellings" element={<Sellings/>}/>
      </Routes>
    </Router>
  )
}

export default App;