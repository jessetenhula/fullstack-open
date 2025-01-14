const PersonForm = ({ handleNameChange, handleNumberChange, handleClick, newName, newNumber}) => {
    return (
        <form className="person-form">
            <h3>Add new</h3>
            <div>
                name: <input onChange={handleNameChange} value={newName} />
                number: <input type="tel" onChange={handleNumberChange} value={newNumber} />
                <button type="submit" onClick={handleClick}>add</button>
            </div>
        </form>
  )
}

export default PersonForm