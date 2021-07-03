import { combineReducers } from 'redux';
import auth from './auth'
import cars from './cars'

export default combineReducers({ auth, cars });