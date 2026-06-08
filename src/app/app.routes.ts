import { Routes } from '@angular/router';
import { Home } from './core/pages/home/home';
import { NotFound } from './core/pages/not-found/not-found';
import { OrderList } from './orders/pages/order-list/order-list';
import { ContactList } from './contacts/pages/contact-list/contact-list';
import { Login } from './auth/pages/login/login';
import { appCanActivate } from './auth/guard/app.auth.guard';
import { AppRoles } from './app.roles';
import { NoAccess } from './auth/pages/no-access/no-access';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'login', component: Login, title: 'Login' },
  {
    path: 'orders',
    component: OrderList,
    title: 'Orders',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Read] },
  },
  {
    path: 'contacts',
    component: ContactList,
    title: 'Contacts',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Read] },
  },
  {
    path: 'noaccess',
    component: NoAccess,
  },
  { path: '**', component: NotFound, title: '404 Page not found!' },
];
