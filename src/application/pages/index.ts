import { RouteConfig } from 'react-router-config';

import { MainPage } from 'Application/pages/main-page/main-page';

export const PAGES: RouteConfig[] = [
  {
    path: '',
    component: MainPage,
  }
];
