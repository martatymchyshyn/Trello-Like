import {createStore} from 'redux';
import combineReducers from '../reducers/reducer'

const store = createStore(combineReducers);

export default store;