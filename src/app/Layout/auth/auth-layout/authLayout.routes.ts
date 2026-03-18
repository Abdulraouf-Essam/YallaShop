import { Routes } from '@angular/router';

export const routesAuthLayout: Routes = [
  {
    path: '',
    loadComponent: () => import('../login/login').then((m) => m.Login),
    data: { title: 'Login' },
  },
  {
    path: 'login',
    loadComponent: () => import('../login/login').then((m) => m.Login),
    data: { title: 'Login' },
  },
  {
    path: 'register',
    loadComponent: () => import('../register/register').then((m) => m.Register),
    data: { title: 'Register' },
  },
];
