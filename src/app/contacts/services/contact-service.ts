import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contact, CreateContact } from '../models/contact';
import { environment } from '../../../environments/environment';

@Service()
export class ContactService {
  private readonly baseUrl = `${environment.backendBaseUrl}contacts/`;
  private readonly http = inject(HttpClient);

  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getAll = (): Observable<Contact[]> =>
    this.http.get(this.baseUrl).pipe(map((c) => Contact.array().parse(c)));

  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getByID = (id: number): Observable<Contact> =>
    this.http.get(`${this.baseUrl}${id}`).pipe(map((c) => Contact.parse(c)));

  // @RolesAllowed({Roles.Update, Roles.Admin})
  store = (createContact: CreateContact): Observable<Contact> =>
    this.http.post(this.baseUrl, createContact).pipe(map((c) => Contact.parse(c)));

  // @RolesAllowed({Roles.Update, Roles.Admin})
  update = (createContact: CreateContact, id: number): Observable<Contact> =>
    this.http.put(`${this.baseUrl}${id}`, createContact).pipe(map((c) => Contact.parse(c)));

  // @RolesAllowed({Roles.Admin})
  delete = (id: number): Observable<Contact> =>
    this.http.delete(`${this.baseUrl}${id}`).pipe(map((c) => Contact.parse(c)));
}
