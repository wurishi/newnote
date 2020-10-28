import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './home';
import Page from './page';

export default () => (
  <div>
    <header>
      <Link to='/'>toHome</Link>
      <br />
      <Link to='/count'>toCount</Link>
    </header>
    <main>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/count' exact component={Page} />
      </Switch>
    </main>
  </div>
);
