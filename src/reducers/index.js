import { combineReducers } from 'redux'
import { data } from './data'
import { instructions } from './instructions'
import { programs } from './programs'

const App = combineReducers({
    data,
    instructions,
    programs
})

export default App
