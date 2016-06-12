import { post } from 'axios'

export const REQUEST_ADD_CONTACT = 'REQUEST_ADD_CONTACT'
export const CONFIRM_ADD_CONTACT = 'CONFIRM_ADD_CONTACT'

function requestAddContact(payload) {
  return {
    type: REQUEST_ADD_CONTACT,
    payload
  }
}

function confirmAddContact(response) {
  return {
    type: CONFIRM_ADD_CONTACT,
    response,
    receivedAt: Date.now()
  }
}

export function addContact(payload, success, failure) {
  return dispatch => {
    dispatch(requestAddContact(payload))
    return post('/api/contact', payload, {
        headers: {'Content-type': 'application/json'}
      })
      .then((response) => {
        dispatch(confirmAddContact(response))
        success()
      })
      .catch((response) => {
        dispatch(confirmAddContact(response))
        failure()
      })
  }
}
