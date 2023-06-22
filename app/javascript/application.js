// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import '@hotwired/turbo-rails';
import './controllers';
import { REACT_APP_API_WEBSOCKET } from 'env';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import ActionCable from 'actioncable';
import App from './src/app';
import store from './src/store';
import theme from './src/tasketeer.theme';

import './src/styles/colors.module.css';

const container = document.getElementById('root');
const root = createRoot(container);
const cableApp = {};
cableApp.cable = ActionCable.createConsumer(`${REACT_APP_API_WEBSOCKET}cable`);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App cable={cableApp.cable} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
  );
});
