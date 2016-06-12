import {
  REQUEST_PROCESS_DATA, RECEIVE_DATA_RESULT
} from '../actions/mlAction'

function machineLearning(state = {
  isPosting: false,
  didInvalidate: false,
  data: [],
  response: [],
  result: []
}, action) {
  switch (action.type) {
    case REQUEST_PROCESS_DATA:
      return Object.assign({}, state, {
        isPosting: true,
        didInvalidate: false,
        data: action.data
      })
    case RECEIVE_DATA_RESULT:
      return Object.assign({}, state, {
        isPosting: false,
        didInvalidate: false,
        result: action.result,
        lastUpdated: receivedAt
      })
    default:
      return state
  }
}

export default machineLearning
