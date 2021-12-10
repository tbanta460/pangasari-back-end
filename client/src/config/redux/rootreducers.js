import { combineReducers } from 'redux';
import { SetForm } from './reducer/setform.js';
import { GetUserById } from './reducer/getUser.js';
import { GetError } from './reducer/setError.js'

export const reducer = combineReducers({SetForm, GetUserById, GetError})