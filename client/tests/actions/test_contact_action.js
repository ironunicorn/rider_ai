import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai'
import sinon from 'sinon'
import * as actions from '../../src/js/actions/contactAction'
import axios from 'axios'
import * as ajax from '../../src/js/utilities/ajax'
import MockAdapter from 'axios-mock-adapter'


const mock = new MockAdapter(axios)
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
sinon.stub(ajax, 'getCsrf').returns('superSecretToken')


describe('contact actions', () => {

  afterEach(() => {
    mock.reset()
  })

  it('dispatches request and confirm contact actions on addContact', () => {
    const data = {contact: 1}
    mock.onPost('/api/contact').reply(200, data)

    const payload = {
      name: 'little',
      email_address: 'little@cat.com',
      message: 'meow'
    }
    function success () {}
    function failure () {}

    const store = mockStore({})
    return store.dispatch(actions.addContact(payload, success, failure))
      .then(() => {
        const dispatchedActions = store.getActions()
        expect(dispatchedActions[0].type).to.equal(actions.REQUEST_ADD_CONTACT)
        expect(dispatchedActions[1].type).to.equal(actions.CONFIRM_ADD_CONTACT)
      })
  })

  it('calls success on successful addContact', () => {
    const data = {contact: 1}
    mock.onPost('/api/contact').reply(200, data)

    const payload = {
      name: 'little',
      email_address: 'little@cat.com',
      message: 'meow'
    }
    let success = sinon.spy()
    let failure = sinon.spy()

    const store = mockStore({})
    return store.dispatch(actions.addContact(payload, success, failure))
      .then(() => {
        expect(success.called).to.be.true
        expect(failure.called).to.be.false
      })
  })

  it('calls failure on failed addContact', () => {
    const data = {error: ':('}
    mock.onPost('/api/contact').reply(400, data)

    const payload = {
      name: 'little',
      email_address: 'little@cat.com',
      message: 'meow'
    }
    let success = sinon.spy()
    let failure = sinon.spy()

    const store = mockStore({})
    return store.dispatch(actions.addContact(payload, success, failure))
      .then(() => {
        expect(success.called).to.be.false
        expect(failure.called).to.be.true
      })
  })
})
