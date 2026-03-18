import { Routes } from '@angular/router';

export const routesBlankLayout: Routes = [
  {
    path: '',
    loadComponent: () => import('../home/home').then((m) => m.Home),
    data: { title: 'Home' },
  },
  {
    path: 'products',
    loadComponent: () => import('../products/products').then((m) => m.Products),
    data: { title: 'Products' },
  },
  {
    path: 'products/:category',
    loadComponent: () => import('../products/products').then((m) => m.Products),
    data: { title: 'Products' },
  },
  {
    path: 'product/:id',
    loadComponent: () => import('../product-detail/product-detail').then((m) => m.ProductDetail),
    data: { title: 'Product Details' },
  },
  {
    path: 'categories',
    loadComponent: () => import('../categories/categories').then((m) => m.Categories),
    data: { title: 'Categories' },
  },
];
