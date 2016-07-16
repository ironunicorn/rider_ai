import {
  REQUEST_ADD_CONTACT, CONFIRM_ADD_CONTACT
} from '../actions/contactAction'

function contact(state = {
  isPosting: false,
  payload: {}
}, action) {
  const { response, payload } = action
  switch (action.type) {
    case REQUEST_ADD_CONTACT:
      return Object.assign({}, state, {
        isPosting: true,
        payload
      })
    case CONFIRM_ADD_CONTACT:
      return Object.assign({}, state, {
        isPosting: false,
        response: response.data,
        payload: response.status === 200 ? {} : state.payload,
      })
    default:
      return state
  }
}

export default contact
