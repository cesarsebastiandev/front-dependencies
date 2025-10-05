import { Routes } from '@angular/router';
export const dependenciesRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./dependencies-table/dependencies-table').then(
        (m) => m.DependenciesTable
      ),
    title: 'Lista de dependencias',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
