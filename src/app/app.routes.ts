import { Routes } from '@angular/router';
import { Home } from './core/pages/home/home';
import { NotFound } from './core/pages/not-found/not-found';
import { OrderList } from './orders/pages/order-list/order-list';
import { ContactList } from './contacts/pages/contact-list/contact-list';
import { appCanActivate } from './auth/guard/app.auth.guard';
import { AppRoles } from './app.roles';
import { NoAccess } from './auth/pages/no-access/no-access';
import { AuthView } from './auth/pages/auth-view/auth-view';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'auth', component: AuthView, title: 'Auth' },
  {
    path: 'contacts/:id/orders',
    component: OrderList,
    title: 'Orders',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Read, AppRoles.Update, AppRoles.Admin] },
  },
  {
    path: 'contacts',
    component: ContactList,
    title: 'Contacts',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Read, AppRoles.Update, AppRoles.Admin] },
  },
  {
    path: 'noaccess',
    component: NoAccess,
  },
  { path: '**', component: NotFound, title: '404 Page not found!' },
];
