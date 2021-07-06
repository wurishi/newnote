import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './home';
import Page from './page';
import Hehe from 'pages/hehe.jsx';
import TS from 'pages/ts.tsx';

export default () => (
  <div>
    <header>
      <Link to="/">toHome</Link>
      <br />
      <Link to="/count">toCount</Link>
      <br />
      <Link to="/hehe">toHehe</Link>
      <br />
      <Link to="/ts">toTS</Link>
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/count" exact component={Page} />
        <Route path="/hehe" exact component={Hehe} />
        <Route path="/ts" exact component={TS} />
      </Switch>
    </main>
  </div>
);
