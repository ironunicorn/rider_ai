import { combineReducers } from 'redux'
import contact from './contact'
import machineLearning from './machineLearning'

const rootReducer = combineReducers({
  contact,
  machineLearning
})

export default rootReducer
