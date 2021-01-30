import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';

import { PAGES } from 'Application/pages';
import {Context} from '@reactblog/ui/context';
import { Container } from '@reactblog/core/container';

render(
  <Context.Provider value={new Container()}>
    <Router history={createBrowserHistory()}>
      {renderRoutes(PAGES)}
    </Router>
  </Context.Provider>,
  document.getElementById('root'),
);
