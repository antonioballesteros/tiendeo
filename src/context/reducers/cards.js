import {
  CARDS_LOADING,
  CARDS_LOAD_SUCCESS,
  CARDS_LOAD_ERROR,
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

export const cardsInitialState = {
  cards: {
    loading: false,
    error: false,
    data: null,
    updating: false,
  },
}

const cards = (state, { payload, type }) => {
  console.log('Cards Reducer', { type, payload })
  switch (type) {
    case CARDS_LOADING: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: true,
          error: false,
        },
      }
    }

    case CARDS_LOAD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: false,
          data: payload,
        },
      }
    }

    case CARDS_LOAD_ERROR: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: false,
          error: payload,
        },
      }
    }

    // --- add card

    case ADD_CARD_UPDATING: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: true,
          error: false,
        },
      }
    }

    case ADD_CARD_ERROR: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: false,
          error: payload,
        },
      }
    }

    case ADD_CARD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: false,
          data: [payload, ...state.cards.data],
        },
      }
    }

    // --- update card

    case UPDATE_CARD_UPDATING: {
      return {
        ...state,
        cards: {
          ...state.cards,
          updating: true,
          error: false,
        },
      }
    }

    case UPDATE_CARD_ERROR: {
      return {
        ...state,
        cards: {
          ...state.cards,
          updating: false,
          error: true,
        },
      }
    }

    case UPDATE_CARD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: false,
          data: state.cards.data.map((card) =>
            card.id === payload.id ? payload : card
          ),
        },
      }
    }

    // delete card

    // --- update card

    case DELETE_CARD_UPDATING: {
      return {
        ...state,
        cards: {
          ...state.cards,
          updating: true,
          error: false,
        },
      }
    }

    case DELETE_CARD_ERROR: {
      return {
        ...state,
        cards: {
          ...state.cards,
          updating: false,
          error: true,
        },
      }
    }

    case DELETE_CARD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          loading: false,
          data: state.cards.data.filter((card) => card.id !== payload.id),
        },
      }
    }

    default:
      return state
  }
}

export default cards
