import React from "react"
import Digicard from "./DigiCard"
import DigimonList from "./DigimonList"
import ShowCard from "./ShowCard"

interface Digicard {
  name: string,
  img: string,
  level: string
}


function AddToList() {
  const [myList, setMyList] = React.useState<Array<Digicard>>([])
}

function keepDigimon() {
  const newDigimon = {
    name: digimon.name,
    img: digimon.img,
    level: digimon.level
  }
  const digimonListCopy = structuredClone(myList)
  digimonListCopy.push(newDigimon)
  setMyList(digimonListCopy)
  fetchDigimon()
}

<button onClick={keepDigimon}>Keep</button>