# Project-02
## Digicard App

### Description

For my second solo project, I created a frontend, single page app over the course of 1 week using React where users can browse through Digimon cards and add their favourite cards to their personalised deck.

### Deployment link

Click here to view the application : https://digicards-project2.netlify.app

### Technical Requirements

* Consume a public API
* The app should include a router
* Include wireframes
* Have semantically clean HTML
* Be deployed online and accessible to the public.

### Overview

 By navigating through the navbar tabs, the user can find a library of Digimon carbs which is rendered through the use of a public API. Features included on this page include filters by the Digimon 'level' as well as by searching for a name through the search bar. Each of the individual cards can be clicked on to see a description of the Digimon. In addition to this, each card has an 'Add To Deck' button which saves the selected card to a personalised Digimon list.

### Technologies Used

The main methods used to form this single page app included the following:

* HTML5
* CSS3
* TypeScript
* JSX
* React
* API's
* Promises
* Git and GitHub

## Build Process

The initial stage of the project was to plan the content for each of the pages and decide on what functions would be used to allow the pages to interact with each other.  I did this by creating a number of different 'components' folders which contained the JSX code for each element of the app. 

Within the 'App' file, I linked each of the components to a different 'Route' which consists of a path and an element, each element being imported from the components. This tells React Router what to show on a particular URL. The purpose of using Routes is to ensure the page does not need to to reload each time a tab is clicked.  A navbar is also used to navigate between these pages.

```
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
```


The main components comprised of the following:

* Digicard

Multiple props are passed to a component to provide information for the individual card. Basic in-line CSS is used to design the layout. Each props has a defined type through the use of an interface.
```
interface IDigimon {
  commonName: string,
  commonImg: string,
  commonLevel: string,
  keepDigimon?: Function
}

function Digicard({ commonName, commonImg, commonLevel, keepDigimon }: IDigimon) {
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
      {keepDigimon && <button onClick={() => {keepDigimon(commonName, commonImg, commonLevel)}} >Add to deck</button>}
    </div>
  </div>
}
``` 


* DigimonList

The DigiCards are then passed through a ```map()``` function to allow information from the API for each Digimon to be rendered. The API is fetched through ```async()``` ```await``` within a ```useEffect()``` function.
```
React.useEffect(() => {
    async function fetchDigimon() {
      const resp = await fetch("https://digimon-api.vercel.app/api/digimon")
      const digimonData = await resp.json()
      setDigimons(digimonData)
    }
    fetchDigimon()
  }, [])
```


* ShowCard

This component is used in a separate route and allows the user to view the card individually, showing a more detailed description of the card. The individual card is fetched by suffixing ```/${cardName}``` at the end of the API URL. The addition of Hooks allowed me to use state without the use of writing classes. This allowed changes to render on the page as I passed props through the ```return``` section. ```useParams``` was used to retrieve route parameters from the component rendered by the matching route as shown below. An example of this is when filtering the Digimon list through the search bar or drop menu filter which re-renders without reloading the page.

```
const { cardName } = useParams()
const [card, setCard] = React.useState<ShowCard>(null)
```


### Challenges

The main challenge of this project was to be able to save a selected Digimon card to the personalised list which renders on a separate page. This was overcome by firstly creating a ```keepDigimon``` function that lives on the App page. Within this function, a ```structuredClone``` method is used which allows the selected card to be copied or 'transferred' to the new object with the ```.push()``` method.

```
function keepDigimon(commonName: string, commonImg: string, commonLevel: string) {
    const newDigimon = {
      name: commonName,
      img: commonImg,
      level: commonLevel
    }
    const digimonListCopy = structuredClone(myList)
    digimonListCopy.push(newDigimon)
    setMyList(digimonListCopy)
  }
```


This function was then used within the ```DigimonList``` route to allow the function to be used as a prop within the filter function.

```
<Route path="/digimon" element={<DigimonList keepDigimon={keepDigimon} />} />
```

```
{filterNames(filterDigimon())?.map((digimon: any) => {
        return <Digicard
          key={digimon.name}
          commonName={digimon.name}
          commonImg={digimon.img}
          commonLevel={digimon.level}
          keepDigimon={keepDigimon}
        />
      })}
```

### Wins

I was able to overcome the challenges faced in creating a functional single page app and produce an interactive app with multiple tabs which render new pages without reloading the page. I was able to create and implement a function that allowed individual cards to be stored and saved to a separate page. This has made me realise the potential to use this method in saving items to a basket for future projects. I was able to show my ability to filter through items on a page through multiple e=means such as drop down and search filters.

### Lessons learnt

* Use functional components. This proved to be a helpful tool with the availability of hooks. 
* JSX proved to be a practical approach to execute JavaScript code within the HTML.
* The use of props allowed the JSX to be more dynamic by passing data between the components.
