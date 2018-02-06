import {
  ADD_USER_CITY,
} from '../actions/cityActions';

const defaultState = [];

const userCities = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_USER_CITY:
      return [
        payload,
        ...state,
      ];
    default:
      return state;
  }
};

export default userCities;
