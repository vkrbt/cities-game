import { getCityCoordinatesUser, getCityCoordinatesComputer, getRandomCity } from '../api';

export const CHECK_CITY_SENT = 'CHECK_CITY_SENT';
export const CHECK_CITY_RECEIVED = 'CHECK_CITY_RECEIVED';
export const CHECK_CITY_ERROR = 'CHECK_CITY_ERROR';
export const checkCity = city => (dispatch) => {
  dispatch({ type: CHECK_CITY_SENT });
  return getCityCoordinatesUser(city)
    .then((res) => {
      if (res === null) {
        dispatch({ type: CHECK_CITY_ERROR });
        return res;
      }
      const payload = {
        ...res,
        cityName: city.toLowerCase(),
      };
      dispatch({ type: CHECK_CITY_RECEIVED, payload });
      return payload;
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

export const checkCityExistance = (city, userCities, computerCities) => {
  const lowerCity = city.toLowerCase();
  return (
    userCities.items.find(item => item.cityName === lowerCity) ||
    computerCities.items.find(item => item.cityName === lowerCity)
  );
};

export const GENERATE_CITY_SENT = 'GENERATE_CITY_SENT';
export const GENERATE_CITY_RECEIVED = 'GENERATE_CITY_RECEIVED';
export const GENERATE_CITY_ERROR = 'GENERATE_CITY_ERROR';
export const generateRandomCity = () => (dispatch, getState) => {
  const lastLetter = getLastLetter(getState().userCities.items[0].cityName);
  dispatch({ type: GENERATE_CITY_SENT });
  return getRandomCity(lastLetter)
    .then((res) => {
      if (res.city) {
        const state = getState();
        if (checkCityExistance(res.city, state.userCities, state.computerCities)) {
          throw res;
        }
        const lowerCityName = res.city.toLowerCase();
        return getCityCoordinatesComputer(lowerCityName)
          .then((coordinates) => {
            const payload = {
              ...coordinates,
              cityName: lowerCityName,
            };
            dispatch({ type: GENERATE_CITY_RECEIVED, payload });
            return payload;
          })
          .catch((error) => {
            throw error;
          });
      }
      throw res;
    })
    .catch((res) => {
      dispatch({ type: GENERATE_CITY_ERROR });
      return res;
    });
};

export const NEW_GAME = 'NEW_GAME';

export const finishGame = () => (dispatch) => {
  dispatch({ type: NEW_GAME });
};
