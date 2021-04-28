import axios from 'axios'

import {
  CARDS_LOADING,
  CARDS_LOAD_SUCCESS,
  CARDS_LOAD_ERROR,
} from '../constants/actionTypes'

const Cards = (token, dispatch) => {
  dispatch({
    type: CARDS_LOADING,
  })

  const baseUrl = process.env.REACT_APP_API ? process.env.REACT_APP_API : ''
  axios
    .get(`${baseUrl}/cards`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: CARDS_LOAD_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: CARDS_LOAD_ERROR,
        payload: err ? err.toString() : '??',
      })
    })
}

export default Cards
