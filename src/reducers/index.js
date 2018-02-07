import { combineReducers } from 'redux';
import userCities from './userCities';
import computerCities from './computerCities';
import lastLetter from './lastLetter';

const reducers = {
  userCities,
  computerCities,
  lastLetter
};

export default combineReducers(reducers);
