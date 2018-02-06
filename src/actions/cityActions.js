import { getCityCoordinatesUser, getRandomCity, getCityCoordinatesComputer } from '../cities';

export const CHECK_CITY_SENT = 'CHECK_CITY_SENT';
export const CHECK_CITY_RECEIVED = 'CHECK_CITY_RECEIVED';
export const CHECK_CITY_ERROR = 'CHECK_CITY_ERROR';
export const checkCity = (city) => (dispatch) => {
  return getCityCoordinatesUser(city)
    .then((res) => {
      if (res === null) {
        throw res;
      }
    }, (res) => {
      console.error(res);
    });
};

export const GENERATE_CITY_SENT = 'GENERATE_CITY_SENT';
export const GENERATE_CITY_RECEIVED = 'GENERATE_CITY_RECEIVED';
export const GENERATE_CITY_ERROR = 'GENERATE_CITY_ERROR';
export const generateRandomCity = (lastLetter) => (dispatch) => {
  dispatch({ type: GENERATE_CITY_SENT });
  return getRandomCity(lastLetter)
    .then((city) => {
      dispatch({ type: GENERATE_CITY_RECEIVED });
    })
    .then(res => {
      dispatch({ type: GENERATE_CITY_ERROR });
      console.error(res);
    })
}

export const ADD_USER_CITY = 'ADD_USER_CITY';
export const addUserCity = city => (dispatch) => {
  dispatch({ type: ADD_USER_CITY, payload: city });
};


export const ADD_COMPUTER_CITY = 'ADD_COMPUTER_CITY';
export const addComputerCity = city => (dispatch) => {
  dispatch({ type: ADD_COMPUTER_CITY, payload: city });
};
