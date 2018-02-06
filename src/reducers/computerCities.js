import {
  ADD_COMPUTER_CITY,
} from '../actions/cityActions';

const defaultState = [];

const computerCities = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_COMPUTER_CITY:
      return [
        payload,
        ...state,
      ];
    default:
      return state;
  }
};

export default computerCities;
