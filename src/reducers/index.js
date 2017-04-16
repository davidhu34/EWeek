import { combineReducers } from 'redux'
import { data } from './data'
//import { instructions } from './instructions'
import { programs } from './programs'
//import { view } from './view'
import { modal } from './modal'
import { user } from './user'

const App = combineReducers({
    data,
    programs,
    modal,
    user
})

export default App
