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
    // Can't use axios for requext because we can't turn files into json.
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "api/linear_regression", true);
    oReq.onload = function(oEvent) {
      if (oReq.status == 200) {
        console.log(oReq.response)
        dispatch(receiveDataResult(JSON.parse(oReq.response)))
      } else {
        console.log("fail :(")
      }
    };

    oReq.send(data)
  }
}
