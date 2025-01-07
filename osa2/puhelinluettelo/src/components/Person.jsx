const Person = ({ person, removePerson }) => {
  const label = "delete"
  
  return (
    <li>
      {person.name} {person.number}
      <button onClick={removePerson}>{label}</button>
    </li>
  )
}

export default Person