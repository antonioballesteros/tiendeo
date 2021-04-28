import axios from 'axios'

import {
  TOKEN_LOADING,
  TOKEN_SUCCESS,
  TOKEN_ERROR,
} from '../constants/actionTypes'

const auth = ({ dispatch }) => {
  dispatch({
    type: TOKEN_LOADING,
  })

  const baseUrl = process.env.REACT_APP_API ? process.env.REACT_APP_API : ''

  const previousToken = localStorage.getItem('token')
  if (previousToken) {
    dispatch({
      type: TOKEN_SUCCESS,
      payload: previousToken,
    })
  } else {
    axios
      .get(`${baseUrl}/users`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })

      .then((res) => {
        localStorage.setItem('token', res.data)
        dispatch({
          type: TOKEN_SUCCESS,
          payload: res.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: TOKEN_ERROR,
          payload: err ? err.toString() : 'COULD NOT CONNECT',
        })
      })
  }
}

export default auth
