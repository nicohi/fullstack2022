import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = process.env.REACT_APP_OWM_API_KEY

const returnData = response => response.data

const getWeather = (lat, lon) => {
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)

  return request.then(returnData)

}

const weatherService = { getWeather }
export default weatherService
