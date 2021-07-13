import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Router from './router';
import './style.less';
import 'antd/dist/antd.less';
import { ConfigProvider } from 'antd';
import ZHCN from 'antd/lib/locale/zh_CN';

function renderWithHotReload(Router) {
  ReactDOM.render(
    <AppContainer>
      <ConfigProvider locale={ZHCN}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ConfigProvider>
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {})
      .catch((error) => {});
  });
}
