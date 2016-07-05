import {
  REQUEST_PROCESS_DATA, RECEIVE_DATA_RESULT, RESET_DATA
} from '../actions/mlAction'

function machineLearning(state = {
  learning: false,
  data: {},
  result: {}
}, action) {
  switch (action.type) {
    case REQUEST_PROCESS_DATA:
      return Object.assign({}, state, {
        learning: true,
        data: action.data
      })
    case RECEIVE_DATA_RESULT:
      return Object.assign({}, state, {
        learning: false,
        result: action.result,
        lastUpdated: action.receivedAt
      })
    case RESET_DATA:
      return Object.assign({}, state, {
        learning: false,
        result: {},
      })
    default:
      return state
  }
}

export default machineLearning
