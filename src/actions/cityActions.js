import { getCityCoordinatesUser, getRandomCity } from '../cities';

export const CHECK_CITY_SENT = 'CHECK_CITY_SENT';
export const CHECK_CITY_RECEIVED = 'CHECK_CITY_RECEIVED';
export const CHECK_CITY_ERROR = 'CHECK_CITY_ERROR';
export const checkCity = (city) => (dispatch, getState) => {
  dispatch({ type: CHECK_CITY_SENT });
  return getCityCoordinatesUser(city)
    .then((res) => {
      if (res === null) {
        dispatch({ type: CHECK_CITY_ERROR });
        return res;
      }
      dispatch({ type: CHECK_CITY_RECEIVED, payload: city.toLowerCase() });
      return res;
    }, (res) => {
      dispatch({ type: CHECK_CITY_ERROR });
      return res;
    });
};

export const getLastLetter = (word) => {
  const invalidLetters = 'ъьё'.split('');
  const letters = word.split('');
  let lastLetter = letters.pop();
  if (invalidLetters.includes(lastLetter)) {
    lastLetter = letters.pop();
  }
  return lastLetter;
};

export const GENERATE_CITY_SENT = 'GENERATE_CITY_SENT';
export const GENERATE_CITY_RECEIVED = 'GENERATE_CITY_RECEIVED';
export const GENERATE_CITY_ERROR = 'GENERATE_CITY_ERROR';
export const generateRandomCity = () => (dispatch, getState) => {
  const lastLetter = getLastLetter(getState().userCities.items[0]);
  dispatch({ type: GENERATE_CITY_SENT });
  return getRandomCity(lastLetter)
    .then((res) => {
      if (res.city) {
        dispatch({ type: GENERATE_CITY_RECEIVED, payload: res.city.toLowerCase() });
      } else {
        throw res;
      }
    })
    .catch(res => {
      dispatch({ type: GENERATE_CITY_ERROR });
      console.error(res);
    })
}
