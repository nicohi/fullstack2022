import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Country from './components/Country'
import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filter, setFilter] = useState('')
  const [shown, setShown] = useState(null)
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
    if (cs.length === 1) setShown(cs[0])
  }, [countries, filter])

  const handleFilterChange = (event) => setFilter(event.target.value)
  const showFn = c => (event) => setShown(c)

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Notification message={message} />
      <Country country={shown} />
      <Countries countries={filtered} showFn={showFn} />
    </div>
  )
}

export default App
