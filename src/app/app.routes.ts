import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { guestGuard } from './Core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'auth',
    //canActivate: [guestGuard],
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
    canActivate: [authGuard],
  },
];
