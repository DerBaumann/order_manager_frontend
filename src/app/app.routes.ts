import { Routes } from '@angular/router';
import { Home } from './core/pages/home/home';
import { NotFound } from './core/pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: '**', component: NotFound, title: '404 Page not found!' },
];
