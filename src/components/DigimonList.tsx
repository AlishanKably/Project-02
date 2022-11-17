import React, { ChangeEvent } from "react"
import Digicard from "./DigiCard"

interface Digicard {
  name: string,
  img: string,
  level: string
}

type DigimonList = null | Array<Digicard>

function DigimonList() {
  const [digimons, setDigimons] = React.useState<DigimonList>(null)
  const [selectedLevel, setSelectedLevel] = React.useState("Choose level")
  const [search, setSearch] = React.useState("")
  const [myList, setMyList] = React.useState<Array<Digicard>>([])
console.log(myList)
  React.useEffect(() => {
    async function fetchDigimon() {
      const resp = await fetch("https://digimon-api.vercel.app/api/digimon")
      const digimonData = await resp.json()
      setDigimons(digimonData)
    }
    fetchDigimon()
  }, [])

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

  function filterDigimon() {
    return digimons?.filter((digimon) => {
      return digimon.level === selectedLevel || selectedLevel === "Choose level"
    })
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedLevel(e.currentTarget.value)
  }

  function handleSearch(e: ChangeEvent<HTMLSelectElement>) {
    setSearch(e.currentTarget.value)
  }
  function filterNames(filterDigimon) {
    return filterDigimon?.filter((digimon) => {
      return digimon.name.includes(search) || search === ''
    })
  }

  return <section className="section">
    <input placeholder="search" onChange={handleSearch}/>
    <select onChange={handleChange}>
      <option>Choose level</option>
      <option>In Training</option>
      <option>Rookie</option>
      <option>Champion</option>
      <option>Ultimate</option>
      <option>Fresh</option>
      <option>Mega</option>
      <option>Armor</option>
    </select>
  <div className="container">
    <div className="columns is-multiline">
      {filterNames(filterDigimon())?.map((digimon) => {
        return <Digicard
          key={digimon.name}
          commonName={digimon.name}
          commonImg={digimon.img}
          commonLevel={digimon.level}
          keepDigimon={keepDigimon}
        />
      })}
    </div>
  </div>
</section>
}

export default DigimonList