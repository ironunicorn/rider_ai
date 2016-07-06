import { post } from 'axios'
import { getCsrf } from '../utilities/ajax'

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

/**
 * Sends contact message from form to server.
 * @param {Object} payload is the data to send:
 *    {name: string, email_address: string, message: string}
 * @param {Function} success to call on post's success.
 * @param {Function} failure to call on post's failure.
 */
export function addContact(payload, success, failure) {
  return dispatch => {
    dispatch(requestAddContact(payload))
    return post('/api/contact', payload, {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': getCsrf(),
          'X-Rider-AI': 1
        }
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
