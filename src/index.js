import React from 'react';
import ReactDOM from 'react-dom/client';

// Routing
import { BrowserRouter } from "react-router-dom";

// Redux
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'

// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './css/mui.css';
import './css/style.css';
import './css/components.css';

// Date & Time Picker in Deutsch
import 'dayjs/locale/de';
import { deDE } from "@mui/material/locale";
import { deDE as pickersDeDE } from '@mui/x-date-pickers/locales';
import { deDE as coreDeDE } from '@mui/material/locale';

// App laden
import App from './App';

// MUI-Custom-Style erstellen
const theme = createTheme({
  palette: {
    primary: {
      main: '#003B55',
    },
    secondary: {
      light: '#60d4d2',
      main: '#70BFBE',
      dark: '#3baaa8'
    },
    hightlight: {
      light: '#ffab2d',
      main: '#ffa51d',
      dark: '#f69401'
    },
  },
  deDE,
  coreDeDE,
  pickersDeDE,
});

// Datenbank erzeugen
const store = createStore(reducer, applyMiddleware(thunk))

// Wurzelelement erstellen
const root = ReactDOM.createRoot(document.getElementById('root'));

// Komponenten rendern
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);