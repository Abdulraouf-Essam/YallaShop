import { Routes } from '@angular/router';

export const routesAuthLayout: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../login/login').then((m) => m.Login),
    data: { title: 'Login' },
  },
];
