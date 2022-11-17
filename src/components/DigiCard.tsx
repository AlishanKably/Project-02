import { Link } from "react-router-dom"


interface IDigimon {
  commonName: string,
  commonImg: string,
  commonLevel: string
}

function Digicard({ commonName, commonImg, commonLevel }: IDigimon) {
  return <div>
    <Link to={`/digimon/${commonName}`}>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">{commonName}</div>
        </div>
        <div className="card-image">
          <figure className="image image-is-1by1">
            <img src={commonImg} alt={commonImg} />
          </figure>
        </div>
        <div className="card-content">
          <h5>{commonLevel}</h5>
        </div>
      </div>
    </Link>
    <div>
      <button>Add to list</button>
    </div>
  </div>
}

export default Digicard