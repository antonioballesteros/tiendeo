import axios from 'axios'

import {
  UPDATE_CARD_UPDATING,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_ERROR,
} from '../constants/actionTypes'

const UpdateCard = (token, data, dispatch) => {
  dispatch({
    type: UPDATE_CARD_UPDATING,
  })

  const updateDateFiltered = {
    title: data.title,
    description: data.description,
  }

  const baseUrl = process.env.REACT_APP_API ? process.env.REACT_APP_API : ''
  axios
    .put(`${baseUrl}/cards/${data.id}`, updateDateFiltered, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: UPDATE_CARD_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_CARD_ERROR,
        payload: 'PUT:/cards:' + err ? err.toString() : '??',
      })
    })
}

export default UpdateCard
