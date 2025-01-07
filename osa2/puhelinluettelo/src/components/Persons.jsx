import Person from './Person.jsx'

const Persons = ({ persons, filter, removePerson }) => {
    return (
        <>
            <h3>Numbers</h3>
            <ul className="persons-list">
                {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => 
                <Person key={person.id} person={person} removePerson={() => removePerson(person.id)}/>
                )}
            </ul>
        </>
    )
}

export default Persons