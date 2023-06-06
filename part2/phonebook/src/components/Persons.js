const Persons = ({ persons, filterBy }) =>
        <>
          {persons.filter(filterBy).map(p => <p key={p.name}>{p.name} {p.number}</p>)}
        </>

export default Persons
