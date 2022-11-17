import React from "react"
import Digicard from "./DigiCard"
import { useParams, Link } from "react-router-dom"


interface Digicard {
  name: string,
  img: string,
  level: string
}

type ShowCard = null | Digicard

function ShowCard() {
  const { cardName } = useParams()
  const [card, setCard] = React.useState<ShowCard>(null)

  React.useEffect(() => {
    async function fetchCard() {
      const resp = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${cardName}`)
      const cardData = await resp.json()
      setCard(cardData[0])
    }
    fetchCard()
  }, [cardName])

  if (!card) {
    return <p>Loading Card</p>
  }

  return <section className="section">
    <div className="container">
      <h1>Your card</h1>
      <Link to="/digimon">{"⬅ Back to all monsters"}</Link>
      <Digicard
          commonName={card.name}
          commonImg={card.img}
          commonLevel={card.level}
      />
    </div>
  </section>
}

export default ShowCard