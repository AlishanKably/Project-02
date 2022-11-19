import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import DigimonList from './components/DigimonList'
import ShowCard from './components/ShowCard'
import MyList from './components/MyList'

interface Digicard {
  name: string,
  img: string,
  level: string
}

function App() {
  const [myList, setMyList] = useState<Array<Digicard>>([])
  function keepDigimon(commonName, commonImg, commonLevel) {
    const newDigimon = {
      name: commonName,
      img: commonImg,
      level: commonLevel
    }
    const digimonListCopy = structuredClone(myList)
    digimonListCopy.push(newDigimon)
    setMyList(digimonListCopy)
  }

  console.log(myList)
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digimon" element={<DigimonList keepDigimon={keepDigimon} />} />
          <Route path="/digimon/:cardName" element={<ShowCard />} />
          <Route path="/mylist" element={<MyList myList={myList} />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
