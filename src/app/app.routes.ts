import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./Layout/auth/auth-layout/auth-layout').then((m) => m.AuthLayout),
    loadChildren: () =>
      import('./Layout/auth/auth-layout/authLayout.routes').then((m) => m.routesAuthLayout),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Layout/pages/blank-layout/blank-layout').then((m) => m.BlankLayout),
    loadChildren: () =>
      import('./Layout/pages/blank-layout/blankLayout.routes').then((m) => m.routesBlankLayout),
  },
];
