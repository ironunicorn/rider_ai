import {expect} from 'chai'
import contact from '../../src/js/reducers/contact'
import {
  REQUEST_ADD_CONTACT, CONFIRM_ADD_CONTACT
} from '../../src/js/actions/contactAction'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(contact(undefined, {})).to.deep.equal({
      isPosting: false,
      payload: {}
    })
  })

  it('should handle REQUEST_ADD_CONTACT', () => {
    const action = {
      type: REQUEST_ADD_CONTACT,
      payload: {
        name: "Little",
        email_address: "little@cat.com",
        message: "meow"
      }
    }
    expect(contact(undefined, action)).to.deep.equal({
      isPosting: true,
      payload: {
        name: "Little",
        email_address: "little@cat.com",
        message: "meow"
      }
    })
  })

  it('should handle CONFIRM_ADD_CONTACT', () => {
    const state = {
      isPosting: true,
      payload: {
        name: "Little",
        email_address: "little@cat.com",
        message: "meow"
      }
    }
    const action = {
      type: CONFIRM_ADD_CONTACT,
      response: {
        data: {contact: 1},
        status: 200
      }
    }
    expect(contact(state, action)).to.deep.equal({
      isPosting: false,
      response: {contact: 1},
      payload: {}
    })
  })
})
