import axios from 'axios'

import {
  DELETE_CARD_UPDATING,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR,
} from '../constants/actionTypes'

const DeleteCard = (token, data, dispatch) => {
  dispatch({
    type: DELETE_CARD_UPDATING,
  })

  const baseUrl = process.env.REACT_APP_API ? process.env.REACT_APP_API : ''
  axios
    .delete(`${baseUrl}/cards/${data.id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: DELETE_CARD_SUCCESS,
        payload: data, // no podemos usar el res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CARD_ERROR,
        payload: err ? err.toString() : '??',
      })
    })
}

export default DeleteCard
