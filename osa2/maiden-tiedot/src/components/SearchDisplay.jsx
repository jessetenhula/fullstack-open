import CountryDisplay from "./CountryDisplay"

const SearchDisplay = ({ searchResults, weather, handleClick }) => {
  if(searchResults.length > 10) {
    return (
      <p>Too many matches. Specify search</p>
    )
  }

  if(searchResults.length > 1) {
    return (
      <ul>
        {searchResults.map(result => 
        <li key={result.cca2}>{result.name.common}<button onClick={() => handleClick(result)}>show</button></li>)}
      </ul>
    )
  }

  if(searchResults[0] !== undefined) {
    return (
      <CountryDisplay country={searchResults[0]} weather={weather} />
    )
  }

 return (
  <p>No matches</p>
 )
}

export default SearchDisplay