import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './components/Context/context';


ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
