import {
  REQUEST_ADD_CONTACT, CONFIRM_ADD_CONTACT
} from '../actions/contactAction'

function contact(state = {
  isPosting: false,
  didInvalidate: false,
  payload: {}
}, action) {
  const { response, receivedAt } = action
  switch (action.type) {
    case REQUEST_ADD_CONTACT:
      return Object.assign({}, state, {
        isPosting: true,
        didInvalidate: false,
        payload: action.payload
      })
    case CONFIRM_ADD_CONTACT:
      return Object.assign({}, state, {
        isPosting: false,
        didInvalidate: false,
        payload: response.status !== 200 ? {} : state.payload,
        lastUpdated: receivedAt
      })
    default:
      return state
  }
}

export default contact
