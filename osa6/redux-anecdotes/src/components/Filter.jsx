import { filterChanged } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = e => {
    dispatch(filterChanged(e.target.value))
  }

  const style = {
    marginBlock: '1rem'
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter