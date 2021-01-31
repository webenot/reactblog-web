import path from 'path';

import express from 'express';
import mustacheExpress from 'mustache-express';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';

import { PAGES } from 'Application/pages';
import { Container } from '@reactblog/core/container';
import { Context } from '@reactblog/ui/context';
import { LocationService } from '@reactblog/ui/services/location.service';
import { DataService } from '@reactblog/ui/services/data.service';

const app = express();

const currentPath = path.join(global.ROOT_PATH, 'dist', 'server');
const publicPath = path.join(global.ROOT_PATH, 'dist', 'public');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', currentPath + '/views');

app.use(express.static(publicPath));

app.get('/favicon.ico', (req, res) => res.status(500).end());

app.get('*', async (request: express.Request, response: express.Response) => {

  const context: any = {};
  const container = new Container();

  const locationService = container.get<LocationService>(LocationService);
  locationService.handleChangeLocation({
    pathname: request.path,
    search: request.originalUrl.replace(request.path, ''),
  });

  const dataService = container.get<DataService>(DataService);
  await dataService.load(PAGES);

  let body = '';

  try {
    body = renderToString(
      <Context.Provider value={container}>
        <StaticRouter context={context} location={request.url}>
          {renderRoutes(PAGES)}
        </StaticRouter>
      </Context.Provider>,
    );
  } catch (e) {
    console.log(e);
  } finally {
    container.destroy();
    response.render('index', { body });
  }
});

app.listen(process.env.PORT, () => {
  console.info(`Application started at ${process.env.PORT} port`);
});
