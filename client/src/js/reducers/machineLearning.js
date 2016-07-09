import {
  REQUEST_PROCESS_DATA, RECEIVE_DATA_RESULT, RESET_DATA
} from '../actions/mlAction'

function machineLearning(state = {
  learning: false,
  failure: '',
  data: {},
  result: {}
}, action) {
  switch (action.type) {
    case REQUEST_PROCESS_DATA:
      return Object.assign({}, state, {
        learning: true,
        data: action.data,
        failure: ''
      })
    case RECEIVE_DATA_RESULT:
      return Object.assign({}, state, {
        learning: false,
        result: action.result,
        lastUpdated: action.receivedAt,
        failure: action.failure
      })
    case RESET_DATA:
      return Object.assign({}, state, {
        learning: false,
        result: {},
        failure: ''
      })
    default:
      return state
  }
}

export default machineLearning
