import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CreateOrder, Order } from '../models/order';

@Service()
export class OrderService {
  private readonly baseUrl = `${environment.backendBaseUrl}orders/`;
  private readonly http = inject(HttpClient);

  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getAll = (): Observable<Order[]> =>
    this.http.get(this.baseUrl).pipe(map((o) => Order.array().parse(o)));

  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getByID = (id: number): Observable<Order> =>
    this.http.get(`${this.baseUrl}${id}`).pipe(map((o) => Order.parse(o)));

  // @RolesAllowed({Roles.Update, Roles.Admin})
  store = (createOrder: CreateOrder): Observable<Order> =>
    this.http.post(this.baseUrl, createOrder).pipe(map((o) => Order.parse(o)));

  // @RolesAllowed({Roles.Update, Roles.Admin})
  update = (createOrder: CreateOrder, id: number): Observable<Order> =>
    this.http.put(`${this.baseUrl}${id}`, createOrder).pipe(map((o) => Order.parse(o)));

  // @RolesAllowed({Roles.Admin})
  delete = (id: number): Observable<Order> =>
    this.http.delete(`${this.baseUrl}${id}`).pipe(map((o) => Order.parse(o)));
}
