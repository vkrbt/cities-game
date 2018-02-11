import { GENERATE_CITY_RECEIVED, NEW_GAME, getLastLetter } from '../actions/cityActions';

const lastLetter = (state = '', { type, payload }) => {
  switch (type) {
    case GENERATE_CITY_RECEIVED:
      return getLastLetter(payload.cityName);
    case NEW_GAME:
      return '';
    default: return state;
  }
};

export default lastLetter;
