import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: Home,
        title: 'Home',
      },
      {
        path: 'dependencies',
        loadChildren: () =>
          import('../modules/dependencies/dependencies.routes').then(
            (m) => m.dependenciesRoutes
          ),
      },

      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];
