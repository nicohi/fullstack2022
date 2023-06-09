const Countries = ({ countries, showFn }) => {
  if (countries.length === 0) return null
  const countryLine = c =>
        <p key={c.id}>{c.name.common} <button onClick={showFn(c)}>show</button></p>
  return <>
           <h2>Search results</h2>
           {countries.map(countryLine)}
         </>
}

export default Countries
