const Persons = ({ persons, filterBy, deletId }) => {
  const personLine = p =>
    <p key={p.name}>{p.name} {p.number} <button onClick={deletId(p.id)}>delete</button></p>
  return <> {persons.filter(filterBy).map(personLine)} </>
}

export default Persons
