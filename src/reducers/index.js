import { combineReducers } from 'redux';
import userCities from './userCities';
import computerCities from './computerCities';

const reducers = {
  userCities,
  computerCities,
};

export default combineReducers(reducers);
