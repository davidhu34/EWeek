import { combineReducers } from 'redux'
import { data } from './data'
import { programs } from './programs'
import { modal } from './modal'
import { user } from './user'

const App = combineReducers({
    data,
    programs,
    modal,
    user
})

export default App
