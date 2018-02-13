import {
  CHECK_CITY_SENT,
  CHECK_CITY_RECEIVED,
  CHECK_CITY_ERROR,
  NEW_GAME,
} from '../actions/cityActions';
import { get } from '../localStorage';

const preloadedCities = get('userCities');

const defaultState = {
  loading: false,
  success: false,
  items: preloadedCities ? JSON.parse(preloadedCities) : [],
};

const userCities = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CHECK_CITY_SENT:
      return {
        loading: true,
        success: false,
        items: [...state.items],
      };
    case CHECK_CITY_RECEIVED:
      return {
        loading: false,
        success: true,
        items: [
          payload,
          ...state.items,
        ],
      };
    case CHECK_CITY_ERROR:
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

export default userCities;
