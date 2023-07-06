import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Redux
import { Provider } from 'react-redux'//similar a contextAPI
//arquivo único que importa os contexts mais variados, só é trabalho um arquivo desse(store.js)
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>{/*o que será entregue aos componentes, tudo oque está no redux*/}
      <App />
    </Provider>
  </React.StrictMode>
)