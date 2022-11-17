import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import DigimonList from './components/DigimonList'
import ShowCard from './components/ShowCard'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digimon" element={<DigimonList />} />
          <Route path="/digimon/:cardName" element={<ShowCard />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
