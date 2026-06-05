import { Routes } from '@angular/router';
import { Home } from './core/pages/home/home';
import { NotFound } from './core/pages/not-found/not-found';
import { OrderList } from './orders/pages/order-list/order-list';
import { ContactList } from './contacts/pages/contact-list/contact-list';
import { Login } from './auth/pages/login/login';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'login', component: Login, title: 'Login' },
  { path: 'orders', component: OrderList, title: 'Orders' },
  { path: 'contacts', component: ContactList, title: 'Contacts' },
  { path: '**', component: NotFound, title: '404 Page not found!' },
];
