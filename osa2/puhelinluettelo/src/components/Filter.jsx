const Filter = ({ handleChange, value }) => {
    return (
        <>
            <h3>Filter</h3>
            <input onChange={handleChange} value={value} />
        </>
    )
}

export default Filter