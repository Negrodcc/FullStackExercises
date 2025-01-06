import { useState, useEffect, Component} from 'react'
import Service from './services/countries'
import WeatherService from './services/weather'


const Filter = ({filterCountry, handlerCountry}) => {
  return (
    <>
    find countries <input value={filterCountry}
                    onChange={handlerCountry}/>
    </>
  )
}

const CountryButton = ({country, api_key}) => {
  const [toggleShow, setToggleShow] = useState(false)

  if (!toggleShow) {
    return (
      <p>
        {country.name.common} <button onClick={() => setToggleShow(!toggleShow)}>show</button>
      </p>
    )
  }
  else {
    return (
      <>
      <Country country = {country} key={api_key}/> <button onClick={() => setToggleShow(!toggleShow)}>hide</button> 
      </>
      
    )
  }
  
}

const Weather = ({capital, api_key}) => {
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)
  const [description, setDescription] = useState(null)

  //request the weather data and update the data
  WeatherService
    .getWeatherData(capital, api_key, 'en')
    .then(data => {
      setTemperature(data.main.temp)
      setWind(data.wind.speed)
      setDescription(data.weather[0].description)
      setIconUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    })
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature is {temperature} °C</p>
      <img src={iconUrl} alt="Weather Icon"></img>
      <p>Weather description : {description}</p>
      <p>Wind : {wind} km/hr</p>
    </div>
  )
}

const Country = ({country, api_key}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital : {country.capital}</p>
      <p>area : {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Descripción de la imagen" />
      <Weather capital = {country.capital} api_key = {api_key}/>
    </div>
  )
}

function App() {
  const [filterCountry, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  //test the weather key
  const api_key = import.meta.env.VITE_SOME_KEY
  //console.log(api_key)


  //hook which brings all the data only in the first render
  const hookGetAll = () => {  
    Service
      .getAll()
      .then(data => {
        console.log("the data has been fetched")
        setCountries(data)
      })
  }

  //hook which triggered when filterCountry changes, updates the filterCountries
  const hookFilterCountries = () => {
    let currentFilterCountries = []
    //we only filter the countries if the input is not '' or ' ' 
    if (filterCountry != '' && filterCountry != ' ') {
      currentFilterCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))
    }
    console.log("The filter countries are : ", currentFilterCountries)
    setFilterCountries(currentFilterCountries)
  }

  useEffect(hookGetAll, [])
  useEffect(hookFilterCountries, [filterCountry])

  const handlerCountry = (event) => {
    console.log("the filter country is : ", event.target.value)
    setCountry(event.target.value)
  }

  //handler the condition on how many filter countries are
  let content;
  if (filterCountries.length > 10) {
    content = <p>be more specific</p>
  } else if (filterCountries.length > 1) {
    content = filterCountries.map(country => <CountryButton key={country.name.common} country = {country} api_key={api_key}/>)
  } else if (filterCountries.length === 1) {
    content = <Country country = {filterCountries[0]} api_key={api_key}/>;
}

  return (
    <>
    <Filter value = {filterCountry} handlerCountry = {handlerCountry} />
    {content}
    </>
  )
}

export default App
