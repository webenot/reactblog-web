import 'reflect-metadata';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';

import { PAGES } from 'Application/pages';
import {Context} from '@reactblog/ui/context';
import { Container } from '@reactblog/core/container';
import { LocationService } from '@reactblog/ui/services/location.service';
import { DataService } from '@reactblog/ui/services/data.service';

const container = new Container();
const locationService = container.get<LocationService>(LocationService);
const dataService = container.get<DataService>(DataService);
dataService.listen(PAGES);

render(
  <Context.Provider value={container}>
    <Router history={locationService.history}>
      {renderRoutes(PAGES)}
    </Router>
  </Context.Provider>,
  document.getElementById('root'),
);
