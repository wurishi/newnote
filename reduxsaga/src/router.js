import { Route, Switch, Link } from 'react-router-dom';

import Page0101 from './pages/01-01/index';

const list = [{ name: '/01-01', c: Page0101 }];

function renderLinks() {
  return list.map((c) => (
    <>
      <Link to={c.name}>{c.name}</Link>
      <br />
    </>
  ));
}

function renderRoute() {
  return list.map((c) => <Route path={c.name} exact component={c.c} />);
}

export default () => (
  <div>
    <div>
      <h1>Link</h1>
      {renderLinks()}
    </div>
    <div>
      <Switch>{renderRoute()}</Switch>
    </div>
  </div>
);
