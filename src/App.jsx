import React from 'react';
// import styles from "./css";
import { Provider } from 'react-redux';
import store from './redux/store';
import RoutesConfig from './routes';

const App = () => (
  <Provider store={store}>
    <RoutesConfig />
  </Provider>
);

export default App;