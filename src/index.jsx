import React from 'react';
import ReactDOM from 'react-dom';
import SimpleKanbanApp from './components/app/SimpleKanbanApp';
import { Provider } from 'react-redux';
import store from './services/redux/stores/store.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SimpleKanbanApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
