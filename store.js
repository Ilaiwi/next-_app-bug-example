import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createAction, createReducer } from 'redux-act'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK'
}

export const add = createAction('add')
export const tick = createAction('tick')


export const reducer = createReducer({}, exampleInitialState)
  .on(add, (state, payload) => Object.assign({}, state, {
    count: state.count + 1
  }))
  .on(tick, (state,payload)=>  Object.assign({}, state, { lastUpdate: payload.ts, light: !!payload.light }))


// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch(tick({light: true, ts: Date.now() })), 1000)
}


export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
