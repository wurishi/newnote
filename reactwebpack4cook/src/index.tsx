import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Router from './router';
import './style.scss';

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

renderWithHotReload(Router);

const hotModule = (module as any).hot;
if (hotModule) {
  hotModule.accept('./router.js', () => {
    const Router = require('./router.js').default;
    renderWithHotReload(Router);
  });
}

if ('serviceWorkder' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {})
      .catch((error) => {});
  });
}
