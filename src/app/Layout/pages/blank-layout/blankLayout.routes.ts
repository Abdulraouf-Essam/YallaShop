import { Routes } from '@angular/router';

export const routesBlankLayout: Routes = [
  {
    path: '',
    loadComponent: () => import('../home/home').then((m) => m.Home),
    data: { title: 'Home' },
  },
];
