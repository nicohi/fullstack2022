import axios from 'axios'
const baseUrl = '/api/persons'

const returnData = response => response.data

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(returnData)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(returnData)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(returnData)
}

const delet = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(returnData)
}

const personService = { getAll, create, update, delet }
export default personService
