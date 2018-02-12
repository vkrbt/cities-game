import { GENERATE_CITY_RECEIVED, NEW_GAME, getLastLetter } from '../actions/cityActions';
import { get } from '../localStorage';

const preloadedLastLetter = get('lastLetter') || '';

const lastLetter = (state = preloadedLastLetter, { type, payload }) => {
  switch (type) {
    case GENERATE_CITY_RECEIVED:
      return getLastLetter(payload.cityName);
    case NEW_GAME:
      return '';
    default: return state;
  }
};

export default lastLetter;
