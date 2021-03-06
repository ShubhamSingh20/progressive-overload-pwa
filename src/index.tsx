import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'context/Routing';
import './bootstrap.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WorkoutProvider from 'context/WorkoutContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


serviceWorker.register();
