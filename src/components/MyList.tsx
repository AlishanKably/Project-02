import React from "react"
import { useParams } from "react-router-dom"
import Digicard from "./DigiCard"
import ShowCard from "./ShowCard"
import DigimonList from "./DigimonList"


function MyList({myList}) {
  console.log(myList)
  return <div className="columns is-multiline">
  {myList?.map((digimon) => {
    return <Digicard 
    key={digimon.name}
    commonName={digimon.name}
    commonImg={digimon.img}
    commonLevel={digimon.level}
    />
  })}
</div>
}

export default MyList