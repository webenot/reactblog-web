import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';

import { PAGES } from 'Application/pages';

render(
  <Router history={createBrowserHistory()}>
    {renderRoutes(PAGES)}
  </Router>,
  document.getElementById('root'),
);
