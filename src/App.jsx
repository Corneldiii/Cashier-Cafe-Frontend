import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";
import Login from "./page/login"
import Menu from "./page/Menu"
import Sellings from './page/Sellings'
import Storage from './page/Storage'
import Kitchen from './page/Kitchen'
import Users from './page/Employee'
import ProtectedRoute from './ProtectedRoute';
import api from './api/axios'


const App = () => {
  const [users, setUser] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/me');
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    }
    fetchMe()
  }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={
          <ProtectedRoute allowedRoles={['owner', 'kasir']} user={users}>
            <Menu />
          </ProtectedRoute>
        } />
        <Route path="/Sellings" element={
          <ProtectedRoute allowedRoles={['owner', 'kasir']} user={users}>
            <Sellings />
          </ProtectedRoute>
        } />
        <Route path="/Storage" element={
          <ProtectedRoute allowedRoles={['owner', 'kasir', 'kitchen']} user={users}>
            <Storage />
          </ProtectedRoute>
        } />
        <Route path="/Kitchen" element={
          <ProtectedRoute allowedRoles={['owner', 'kitchen']} user={users}>
            <Kitchen />
          </ProtectedRoute>
        } />
        <Route path="/Users" element={
          <ProtectedRoute allowedRoles={['owner']} user={users}>
            <Users />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App;