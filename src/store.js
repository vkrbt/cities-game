import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { set } from './localStorage';

/* eslint-disable no-underscore-dangle */
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;


const store = createStore(reducers, {}, compose(applyMiddleware(thunk), enhancers));

const updateLocalStorage = () => {
  const { lastLetter, computerCities, userCities } = store.getState();
  set('userCities', JSON.stringify(userCities.items));
  set('computerCities', JSON.stringify(computerCities.items));
  set('lastLetter', lastLetter);
};

store.subscribe(updateLocalStorage);

export default store;
