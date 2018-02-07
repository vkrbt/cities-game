import { GENERATE_CITY_RECEIVED, getLastLetter } from '../actions/cityActions';

const lastLetter = (state = '', { type, payload }) => {
  switch (type) {
    case GENERATE_CITY_RECEIVED:
      return getLastLetter(payload);
    default: return state;
  }
}

export default lastLetter;
