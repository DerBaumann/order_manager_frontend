import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contact, CreateContact } from '../models/contact';

@Service()
export class ContactService {
  private readonly baseUrl = 'http://localhost:9090/api/contacts';
  private http = inject(HttpClient);

  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getAll(): Observable<Contact[]> {
    return this.http.get(this.baseUrl).pipe(map((c) => Contact.array().parse(c)));
  }

  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getByID(id: number): Observable<Contact> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((c) => Contact.parse(c)));
  }

  // @RolesAllowed({Roles.Update, Roles.Admin})
  store(createContact: CreateContact): Observable<Contact> {
    return this.http.post(this.baseUrl, createContact).pipe(map((c) => Contact.parse(c)));
  }

  // @RolesAllowed({Roles.Update, Roles.Admin})
  update(createContact: CreateContact, id: number): Observable<Contact> {
    return this.http.put(`${this.baseUrl}/${id}`, createContact).pipe(map((c) => Contact.parse(c)));
  }

  // @RolesAllowed({Roles.Admin})
  delete(id: number): Observable<Contact> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(map((c) => Contact.parse(c)));
  }
}
