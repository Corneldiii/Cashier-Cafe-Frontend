import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login"
import Menu from "./page/Menu"
import Sellings from './page/Sellings'
import Storage from './page/Storage'  
import Kitchen from './page/Kitchen'  
import Users from './page/Employee'  

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path= "/Sellings" element={<Sellings/>}/>
        <Route path= "/Storage" element={<Storage/>}/>
        <Route path= "/Kitchen" element={<Kitchen/>}/>
        <Route path= "/Users" element={<Users/>}/>
      </Routes>
    </Router>
  )
}

export default App;