import {
  CARDS_LOADING,
  CARDS_LOAD_SUCCESS,
  CARDS_LOAD_ERROR,
  CARD_START_MANAGE,
  CARD_END_MANAGE,
  ADD_CARD_UPDATING,
  ADD_CARD_SUCCESS,
  ADD_CARD_ERROR,
  UPDATE_CARD_UPDATING,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_ERROR,
  DELETE_CARD_UPDATING,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR,
} from '../constants/actionTypes'

import cards, { cardsInitialState } from './cards'

test('cards CARDS_LOADING', () => {
  const updateAction = { payload: {}, type: CARDS_LOADING }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    loading: true,
  })
})

test('cards CARDS_LOAD_SUCCESS', () => {
  const updateAction = { payload: '[cards]', type: CARDS_LOAD_SUCCESS }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    loading: false,
    data: '[cards]',
  })
})

test('cards CARDS_LOAD_ERROR', () => {
  const updateAction = { payload: 'this is the error', type: CARDS_LOAD_ERROR }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    loading: false,
    error: 'this is the error',
  })
})

test('cards CARD_START_MANAGE', () => {
  const updateAction = { payload: {}, type: CARD_START_MANAGE }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    updating: false,
    manage: true,
  })
})

test('cards CARD_END_MANAGE', () => {
  const updateAction = { payload: {}, type: CARD_END_MANAGE }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    manage: false,
  })
})

test('cards ADD_CARD_UPDATING', () => {
  const updateAction = { payload: {}, type: ADD_CARD_UPDATING }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    loading: true,
    error: false,
  })
})

test('cards ADD_CARD_SUCCESS', () => {
  const updateAction1 = { payload: { id: 1 }, type: ADD_CARD_SUCCESS }
  const updatedState1 = cards(cardsInitialState, updateAction1)

  expect(updatedState1.cards).toEqual({
    ...cardsInitialState.cards,
    loading: false,
    manage: false,
    data: [{ id: 1 }],
  })

  const updateAction2 = { payload: { id: 2 }, type: ADD_CARD_SUCCESS }
  const updatedState2 = cards(updatedState1, updateAction2)

  expect(updatedState2.cards).toEqual({
    ...updatedState1.cards,
    loading: false,
    manage: false,
    data: [{ id: 2 }, { id: 1 }],
  })
})

test('cards ADD_CARD_ERROR', () => {
  const updateAction = { payload: 'this is the error', type: ADD_CARD_ERROR }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    loading: false,
    error: 'this is the error',
  })
})

test('cards UPDATE_CARD_UPDATING', () => {
  const updateAction = {
    payload: {},
    type: UPDATE_CARD_UPDATING,
  }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    updating: true,
    error: false,
  })
})

test('cards UPDATE_CARD_SUCCESS', () => {
  const updateAction1 = {
    payload: { id: 1, title: 'title 1' },
    type: ADD_CARD_SUCCESS,
  }
  const updatedState1 = cards(cardsInitialState, updateAction1)

  const updateAction2 = {
    payload: { id: 2, title: 'title 2' },
    type: ADD_CARD_SUCCESS,
  }
  const updatedState2 = cards(updatedState1, updateAction2)

  const updateAction3 = {
    payload: { id: 1, title: 'title 1 Updated' },
    type: UPDATE_CARD_SUCCESS,
  }
  const updatedState3 = cards(updatedState2, updateAction3)

  expect(updatedState3.cards).toEqual({
    ...updatedState2.cards,
    loading: false,
    manage: false,
    data: [
      { id: 2, title: 'title 2' },
      { id: 1, title: 'title 1 Updated' },
    ],
  })
})

test('cards UPDATE_CARD_ERROR', () => {
  const updateAction = {
    payload: 'this is the error',
    type: UPDATE_CARD_ERROR,
  }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    updating: false,
    error: 'this is the error',
  })
})

test('cards DELETE_CARD_UPDATING', () => {
  const updateAction = {
    payload: {},
    type: DELETE_CARD_UPDATING,
  }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    updating: true,
    error: false,
  })
})

test('cards DELETE_CARD_SUCCESS', () => {
  const updateAction1 = {
    payload: { id: 1, title: 'title 1' },
    type: ADD_CARD_SUCCESS,
  }
  const updatedState1 = cards(cardsInitialState, updateAction1)

  const updateAction2 = {
    payload: { id: 2, title: 'title 2' },
    type: ADD_CARD_SUCCESS,
  }
  const updatedState2 = cards(updatedState1, updateAction2)

  const updateAction3 = {
    payload: { id: 1 },
    type: DELETE_CARD_SUCCESS,
  }
  const updatedState3 = cards(updatedState2, updateAction3)

  expect(updatedState3.cards).toEqual({
    ...updatedState2.cards,
    loading: false,
    manage: false,
    data: [{ id: 2, title: 'title 2' }],
  })
})

test('cards DELETE_CARD_ERROR', () => {
  const updateAction = {
    payload: 'This is the error',
    type: DELETE_CARD_ERROR,
  }
  const updatedState = cards(cardsInitialState, updateAction)

  expect(updatedState.cards).toEqual({
    ...cardsInitialState.cards,
    updating: false,
    error: 'This is the error',
  })
})
