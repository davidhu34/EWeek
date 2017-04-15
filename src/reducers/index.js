import { combineReducers } from 'redux'
import { data } from './data'
import { instructions } from './instructions'
import { programs } from './programs'
import { view } from './view'
import { user } from './user'

const App = combineReducers({
    data,
    instructions,
    programs,
    view,
    user
})

export default App
