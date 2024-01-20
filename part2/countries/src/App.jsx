import React, { useState, useEffect } from 'react'
import countriesService from './services/countries.service'
import weatherService from './services/weather.service'

const Weather = ({ }) => {

  //console.log("...")


}


const FullCountrie = ({ countrie, handle }) => {
  let lang = []
  for (const [key, value] of Object.entries(countrie.languages)) {
    lang.push(value)
  }

  handle(countrie.capital.toString())
  return (
    <>
      <h1>{countrie.name.common}</h1>
      <p>capital {countrie.capital}</p>
      <p>population {countrie.population}</p>
      <p>languages</p>
      <ul>
        {
          lang.map(element => <li key={element}>{element}</li>)
        }
      </ul>
      <img src={countrie.flags.png} alt="" />
    </>
  )
}
const Countrie = ({ countrie, handleShow }) => {
  return (<p>{countrie.name.common} <button data-name={countrie.name.common} onClick={handleShow} >show</button></p>)
}

const Countries = ({ countries, handleShow, weather, handleWeather }) => {
  let countriesCount = countries.length

  if (countriesCount === 1) {

    return countries.map(countrie => (
      <>
        <FullCountrie key={countrie.name.common} countrie={countrie} handle={handleWeather} />
      </>
    ))
  } else if (countriesCount <= 4) {
    return countries.map(countrie => <Countrie key={countrie.name.common} countrie={countrie} handleShow={handleShow} />)
  } else if (countriesCount > 4) {
    return <p>too many matches, specify another filter</p>
  } else {
    return
  }
}

const Form = ({ handle }) => {
  return (
    <>
      find countries: <input onChange={handle} />
    </>
  )
}

const Error = ({ errorMessage }) => {
  if (errorMessage !== "") {
    return <p>{errorMessage}</p>
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState("")
  const [error, setError] = useState("")

  const hook = () => {
    countriesService
      .getCountries()
      .then(response => console.log(response.data))
  }
  //useEffect(hook, [])


  const searchCountrieHandle = (e) => {
    let like = e.target.value
    if (like.length !== 0) {
      console.log('cargando')
      setError("cargando")
      try {
        countriesService
          .countrieLike(like)
          .then(response => {
            setError("")
            setCountries(response.data)
          })
          .catch(e => {
            setError(e.message)
            console.log("error", e.message)
          })

      } catch (error) {
        console.log("error:", error)
      }
    } else {
      setError("")
      setCountries([])
    }
  }

  const getCountriesWhitName = name => {
    countriesService.getWithName(name).then(response => setCountries(response.data))
  }

  const countrieHandle = (e) => {
    let targetName = e.target.dataset.name
    getCountriesWhitName(targetName)
  }

  const getWeatherWhitCaptial = () => {
    if (capital !== "") {
      weatherService
        .getWeatherWhitCaptial(capital)
        .then(resp => setWeather(resp))
    }
  }

  const handleWeather = (my_capital) => {
    setCapital(my_capital)

    console.log('handleWeather', capital, weather)
  }

  return (
    <>
      <Error errorMessage={error} />
      <Form handle={searchCountrieHandle} />
      <Countries
        countries={countries}
        handleShow={countrieHandle}
        handleWeather={handleWeather}
      />
    </>
  )
}

export default App
