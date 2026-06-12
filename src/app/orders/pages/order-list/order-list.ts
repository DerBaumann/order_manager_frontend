import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../contacts/services/contact-service';
import { Contact } from '../../../contacts/models/contact';

@Component({
  selector: 'app-order-list',
  imports: [],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly contactService = inject(ContactService);

  protected readonly contactId = signal(0);
  protected readonly contact = signal<Contact | null>(null);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.contactId.set(params['id']);
    });
  }

  ngOnInit(): void {
    this.contactService.getByID(this.contactId()).subscribe((c) => this.contact.set(c));
  }
}
