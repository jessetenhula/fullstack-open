const SearchBar = ({ handleChange, searchTerm }) => {
  return (
    <label className="search-bar">
      Find countries
      <input type="text" onChange={handleChange} value={searchTerm}></input>
    </label>
  )
}

export default SearchBar