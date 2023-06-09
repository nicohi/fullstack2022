import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Country from './components/Country'
import Countries from './components/Countries'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filter, setFilter] = useState('')
  const [shown, setShown] = useState(null)
  const [weather, setWeather] = useState(null)
  const [message, setMessage] = useState(['error', null])

  useEffect(() => {
    countryService.getAll()
                  .then((initialCountries =>
                    setCountries(initialCountries.map((c,id) => ({ ...c, id:id }) ))))
  }, [])

  useEffect(() => {
    const filterBy = c => c.name.common.toLowerCase().includes(filter.toLowerCase())
    const cs = countries.filter(filterBy)
    if (cs.length > 10) {
      setMessage(['error','Too many matches, specify another filter'])
      setFiltered([])
    } else {
      setMessage(['', null])
      setFiltered(cs)
    }
    setShown(null)
    setWeather(null)
    if (cs.length === 1) {
      setShown(cs[0])
      setFiltered([])
    }
  }, [countries, filter])

  useEffect(() => {
    if (!shown) return
    if (!shown.capitalInfo.latlng) {
      setMessage(['error', `capitalInfo.latlng field does not exist for ${shown.name.common}`])
      setTimeout(() => {
        setMessage(['',null])
        setWeather(null)
      }, 2000)
      return
    }
    const lat = shown.capitalInfo.latlng[0]
    const lon = shown.capitalInfo.latlng[1]
    weatherService.getWeather(lat, lon)
                  .then(weather => setWeather(weather))
                  .catch(_ => {
                    setMessage(['error', `Failed to fetch weather for ${lat},${lon}`])
                  })
  }, [shown])

  const handleFilterChange = (event) => setFilter(event.target.value)
  const showFn = c => (event) => setShown(c)

  return (
    <div>
      <h1>Country info app</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Notification message={message} />
      <Country country={shown} weather={weather} />
      <Countries countries={filtered} showFn={showFn} />
    </div>
  )
}

export default App
