const Country = ({ country }) => {
  if (!country) return null
  //console.log(Object.entries(country.languages))
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <b>languages: </b>
      <ul>
        {Object.entries(country.languages).map(l => <li key={l[0]}>{l[1]}</li>)}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width="200"/>
    </>
  )
}

export default Country
