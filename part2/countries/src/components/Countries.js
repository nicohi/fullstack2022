const Countries = ({ countries, showFn }) => {
  const countryLine = c =>
        <p key={c.id}>{c.name.common} <button onClick={showFn(c)}>show</button></p>
  return <> {countries.map(countryLine)} </>
}

export default Countries
