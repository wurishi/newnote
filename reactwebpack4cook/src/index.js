import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import '@babel/polyfill';
import { AppContainer } from 'react-hot-loader';
import Router from './router.js';

renderWithHotReload(Router);

if (module.hot) {
  module.hot.accept('./router.js', () => {
    const Router = require('./router.js').default;
    renderWithHotReload(Router);
  });
}

function renderWithHotReload(Router) {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('app')
  );
}
