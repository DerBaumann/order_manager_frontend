import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContactService } from '../../../contacts/services/contact-service';
import { Contact } from '../../../contacts/models/contact';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IsInRolesDirective } from '../../../auth/directives/app-is-in-roles.dir';
import { OrderService } from '../../services/order-service';
import { AppRoles } from '../../../app.roles';
import { Order, OrderTableRow, tableRowFromOrder } from '../../models/order';

@Component({
  selector: 'app-order-list',
  imports: [
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    IsInRolesDirective,
    RouterLink,
  ],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly contactService = inject(ContactService);
  private readonly orderService = inject(OrderService);

  protected readonly contactId = signal(0);
  protected readonly contact = signal<Contact | null>(null);

  @ViewChild(MatSort) sort!: MatSort;
  protected readonly roles = AppRoles;

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'status',
    'startDate',
    'endDate',
    'priority',
    'category',
    'contactName',
    'actions',
  ];
  dataSource = new MatTableDataSource<OrderTableRow>();

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.contactId.set(params['id']);
    });
  }

  ngOnInit(): void {
    this.contactService.getByID(this.contactId()).subscribe((c) => this.contact.set(c));
    this.orderService.getAll().subscribe((o) => (this.dataSource.data = o.map(tableRowFromOrder)));
  }

  create() {}

  edit(order: Order) {}

  delete(order: Order) {}
}
