import axios from 'axios'

import {
  ADD_CARD_UPDATING,
  ADD_CARD_SUCCESS,
  ADD_CARD_ERROR,
} from '../constants/actionTypes'

const AddCard = ({ token, data, dispatch }) => {
  dispatch({
    type: ADD_CARD_UPDATING,
  })

  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  if (data.image) {
    formData.append('image', data.image)
  }

  const baseUrl = process.env.REACT_APP_API ? process.env.REACT_APP_API : ''
  axios
    .post(`${baseUrl}/cards`, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: ADD_CARD_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: ADD_CARD_ERROR,
        payload: err ? err.toString() : '??',
      })
    })
}

export default AddCard
