import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Service()
export class ContactService {
  private readonly baseUrl = 'http://localhost:9090/api/contacts';
  private http = inject(HttpClient);

  getAll(): Observable<Contact[]> {
    return this.http.get(this.baseUrl).pipe(map((c) => Contact.array().parse(c)));
  }

  // @GetMapping("/{id}")
  // @RolesAllowed({Roles.Read, Roles.Update, Roles.Admin})
  getByID(id: number): Observable<Contact> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((c) => Contact.parse(c)));
  }
  //
  // @PostMapping("/")
  // @RolesAllowed({Roles.Update, Roles.Admin})
  // public ResponseEntity<Contact> store(@RequestBody @Valid ContactRequestDTO requestDTO) {
  //     return new ResponseEntity<>(contactService.create(requestDTO), HttpStatus.CREATED);
  // }
  //
  // @PutMapping("/{id}")
  // @RolesAllowed({Roles.Update, Roles.Admin})
  // public @ResponseBody Contact update(@RequestBody @Valid ContactRequestDTO requestDTO, @PathVariable Long id) {
  //     return contactService.update(id, requestDTO);
  // }
  //
  // @DeleteMapping("/{id}")
  // @RolesAllowed({Roles.Admin})
  // public @ResponseBody Contact destroy(@PathVariable Long id) {
}
