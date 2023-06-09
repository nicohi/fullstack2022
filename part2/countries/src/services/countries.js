import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const returnData = response => response.data

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(returnData)
}

const countryService = { getAll }
export default countryService
