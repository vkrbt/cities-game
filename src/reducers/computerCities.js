import {
  GENERATE_CITY_SENT,
  GENERATE_CITY_RECEIVED,
  GENERATE_CITY_ERROR,
  NEW_GAME,
} from '../actions/cityActions';
import { get } from '../localStorage';

const preloadedCities = get('computerCities');

const defaultState = {
  loading: false,
  success: false,
  items: preloadedCities ? JSON.parse(preloadedCities) : [],
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
      return {
        loading: false,
        success: false,
        items: [],
      };
    default:
      return state;
  }
};

export default computerCities;
