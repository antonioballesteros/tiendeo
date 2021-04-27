import {
  TOKEN_LOADING,
  TOKEN_SUCCESS,
  TOKEN_ERROR,
} from '../constants/actionTypes'

import auth, { authInitialState } from './auth'

test('auth TOKEN_LOADING', () => {
  const updateAction = { payload: {}, type: TOKEN_LOADING }
  const updatedState = auth(authInitialState, updateAction)
  expect(updatedState.auth).toEqual({
    ...authInitialState.auth,
    loading: true,
  })
})

test('auth TOKEN_ERROR', () => {
  const updateAction = { payload: 'this is the error', type: TOKEN_ERROR }
  const updatedState = auth(authInitialState, updateAction)
  expect(updatedState.auth).toEqual({
    ...authInitialState.auth,
    loading: false,
    error: 'this is the error',
  })
})

test('auth TOKEN_SUCCESS', () => {
  const updateAction = { payload: 'this is the token', type: TOKEN_SUCCESS }
  const updatedState = auth(authInitialState, updateAction)
  expect(updatedState.auth).toEqual({
    ...authInitialState.auth,
    loading: false,
    token: 'this is the token',
  })
})
