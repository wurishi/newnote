import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
// import Router from './router';
import { routers } from './routes';
import './style.less';
import { ConfigProvider } from 'antd';
import ZHCN from 'antd/lib/locale/zh_CN';

function renderRoute(routers: any[]) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        {routers.map((router, index) => {
          const { scomponent, component, children, layout, ...rest } = router;
          if (children) {
            const SComponent = scomponent;
            return (
              <Route key={index} {...rest}>
                <SComponent>{renderRoute(children)}</SComponent>
              </Route>
            );
          }
          return (
            <Route key={index} exact {...rest} component={lazy(component)} />
          );
        })}
      </Switch>
    </Suspense>
  );
}

function renderWithHotReload(routers) {
  ReactDOM.render(
    <AppContainer>
      <ConfigProvider locale={ZHCN}>
        <BrowserRouter>{renderRoute(routers)}</BrowserRouter>
      </ConfigProvider>
    </AppContainer>,
    document.getElementById('app')
  );
}

renderWithHotReload(routers);

const hotModule = (module as any).hot;
if (hotModule) {
  hotModule.accept('./router.js', () => {
    const { routers } = require('./routes');
    renderWithHotReload(routers);
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
