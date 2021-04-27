import {
  TOKEN_LOADING,
  TOKEN_SUCCESS,
  TOKEN_ERROR,
} from '../constants/actionTypes'

export const authInitialState = {
  auth: {
    loading: false,
    error: false,
    token: null,
  },
}

const auth = (state, { payload, type }) => {
  // console.log('Auth Reducer', { type, payload })

  switch (type) {
    case TOKEN_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: false,
          token: null,
        },
      }

    case TOKEN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          token: payload,
        },
      }

    case TOKEN_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: payload,
          token: null,
        },
      }
    default:
      return state
  }
}

export default auth
