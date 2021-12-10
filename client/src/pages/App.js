
import './App.css';
import React from 'react'
import Main from './main.js'
import {Provider} from 'react-redux'
import { store } from '../config';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
