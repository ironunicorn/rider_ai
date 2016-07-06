import { getCsrf } from '../utilities/ajax'

export const REQUEST_PROCESS_DATA = 'REQUEST_PROCESS_DATA'
export const RECEIVE_DATA_RESULT = 'RECEIVE_DATA_RESULT'
export const RESET_DATA = 'RESET_DATA'

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

/**
 * Processes uploaded csv files and returns results from the server.
 * @param {Object} data is the FormData of 'learn' and 'predict' files.
 * @param {Function} failure is called if server process fails.
 */
export function processData(data, failure) {
  return dispatch => {
    dispatch(requestProcessData(data))
    // Can't use axios for requext because we can't turn files into json.
    var oReq = new XMLHttpRequest();
    oReq.open('POST', 'api/linear_regression', true);
    oReq.setRequestHeader('X-CSRFToken', getCsrf())
    oReq.setRequestHeader('X-Rider-AI', 1)
    oReq.onload = function(oEvent) {
      if (oReq.status == 200) {
        const answer = JSON.parse(oReq.response)
        dispatch(receiveDataResult(answer))
      } else {
        const fail = JSON.parse(oReq.response)
        dispatch(receiveDataResult({}))
        failure({failure: fail})
      }
    };

    oReq.send(data)
  }
}

/**
 * Resets file upload wizard for another analysis.
 */
export function resetData() {
  return {
    type: RESET_DATA
  }
}
