import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Info from './pages/Info'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info/:id" element={<Info />} />
    </Routes>
  )
}

export default App