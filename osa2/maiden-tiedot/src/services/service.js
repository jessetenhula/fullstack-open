import axios from "axios"

const getCountries = () => {
  const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
  return request.then(response => response.data)
}

const getAreaCoordinates = (area, apiKey) => {
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=1&appid=${apiKey}`)
  return request.then(response => [response.data[0].lat, response.data[0].lon])
}

const getWeather = (coords, apiKey) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${apiKey}`)
  return request.then(response => response.data)
}


export default { getCountries, getAreaCoordinates, getWeather }