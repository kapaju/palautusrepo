/**
 * Fullstack Mooc 2020
 * Osa 2 maiden tiedot
 * Katja Wallenius
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryFinder = ({countryName, handleCountryChange}) => {
  return(
    <div>
      find countries 
      <input 
        value={countryName}
        onChange={handleCountryChange}
      >  
      </input>
     </div>
  )  
}

const Weather = ({ city }) => {

  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: city,
      units: 'm'
    }
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log('fetched weather data')
        setWeather(response.data)
      })
  }, [])


  if (weather) {
    console.log(weather)
    return(
      <div>
        <h2>Weather in {city}</h2>
        <p>
          <strong>Temperature: </strong> {weather.current.temperature} Celsius
        </p>
        {weather.current.weather_icons.map(icon => {
          return(
            <img src={icon} width={50} alt=""/>
          )
        })}
        <p>
          <strong>Wind:</strong> {weather.current.wind_speed} mph 
          direction {weather.current.wind_dir}
        </p>
      </div>
    )
  }
  else {
    return(
      <></>
    )
  }
 

}

const ShowCountry = ({ country }) => {

  return(
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lan => 
          <li key={lan.name}>{lan.name}</li>
        )}
      </ul>
      <img 
        src={country.flag} 
        alt="country flag" 
        width={200} 
        border={1}
      />
      <Weather city={country.capital} />
    </div>
  )
}

const ShowCountryList = ({matches, handleButtonClick}) => {

  return(
    <ul>
      {matches.map(country => {
        return(
          <li key={country.name}>{country.name}
            <button value={country.name} onClick={handleButtonClick}>show</button>
          </li>
        )
      })}
    </ul>
)
}

const Display = ({countryName, countries, selectedCountry, handleButtonClick}) => {

  const matches = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()))

  if(selectedCountry.length >= 1) {
    console.log("found country!")
    return(
      <ShowCountry country={selectedCountry[0]} />
    )
  }
  else if(matches.length < 10 ) {
    return(
      <ShowCountryList matches={matches} handleButtonClick={handleButtonClick}/>
    )
  }
  else {
    return (
      <p>Too may countries, please specify!</p>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountryName(event.target.value)
    const matches = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if(matches.length === 1) {
      setSelectedCountry(matches)
    }
    else {
      setSelectedCountry([])
    }
  }

  const handleButtonClick = (event) => {

    const countryToShow = countries.filter(country => country.name === event.target.value)
    console.log(countryToShow[0])
    setSelectedCountry(countryToShow)
  }

  return (
    <div>
      <CountryFinder 
        countryName={countryName} 
        handleCountryChange={handleCountryChange}
      />
      <Display 
        countryName={countryName} 
        countries={countries}
        selectedCountry={selectedCountry}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}

export default App;
