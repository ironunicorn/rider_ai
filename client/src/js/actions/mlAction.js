import { post } from 'axios'

export const REQUEST_PROCESS_DATA = 'REQUEST_PROCESS_DATA'
export const RECEIVE_DATA_RESULT = 'RECEIVE_DATA_RESULT'

function requestProcessData(data) {
  return {
    type: REQUEST_PROCESS_DATA,
    data
  }
}

function receiveDataResult(result) {
  return {
    type: RECEIVE_DATA_RESULT,
    result,
    receivedAt: Date.now()
  }
}

export function processData(data) {
  return dispatch => {
    dispatch(requestProcessData(data))
    return post('/api/contact', payload, {
        headers: {'Content-type': 'application/json'}
      })
      .then((response) => {
        dispatch(receiveDataResult(response))
      })
      .catch((response) => {
        dispatch(receiveDataResult(response))
      })
  }
}
