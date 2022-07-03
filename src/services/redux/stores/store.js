import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/reducer.js';

const store = configureStore({ reducer: reducer });

export default store;
