import {
  GENERATE_CITY_SENT,
  GENERATE_CITY_RECEIVED,
  GENERATE_CITY_ERROR,
  NEW_GAME,
} from '../actions/cityActions';

const defaultState = {
  loading: false,
  success: false,
  items: [],
};

const computerCities = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GENERATE_CITY_SENT:
      return {
        loading: true,
        success: false,
        items: [...state.items],
      };
    case GENERATE_CITY_RECEIVED:
      return {
        loading: false,
        success: true,
        items: [
          payload,
          ...state.items,
        ],
      };
    case GENERATE_CITY_ERROR:
      return {
        loading: false,
        success: false,
        items: [...state.items],
      };
    case NEW_GAME:
      return defaultState;
    default:
      return state;
  }
};

export default computerCities;
