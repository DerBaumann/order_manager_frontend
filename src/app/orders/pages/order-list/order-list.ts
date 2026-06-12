import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IsInRolesDirective } from '../../../auth/directives/app-is-in-roles.dir';
import { OrderService } from '../../services/order-service';
import { AppRoles } from '../../../app.roles';
import { Order, OrderTableRow, tableRowFromOrder } from '../../models/order';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormDialog } from '../../components/order-form-dialog/order-form-dialog';
import { OrderDeleteDialog } from '../../components/order-delete-dialog/order-delete-dialog';

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
  // private readonly activatedRoute = inject(ActivatedRoute);
  // private readonly contactService = inject(ContactService);
  private readonly service = inject(OrderService);
  private readonly dialog = inject(MatDialog);

  // protected readonly contactId = signal(0);
  // protected readonly contact = signal<Contact | null>(null);

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
    // this.activatedRoute.params.subscribe((params) => {
    //   this.contactId.set(params['id']);
    // });
  }

  ngOnInit(): void {
    // this.contactService.getByID(this.contactId()).subscribe((c) => this.contact.set(c));
    this.service.getAll().subscribe((o) => (this.dataSource.data = o.map(tableRowFromOrder)));
  }

  create() {
    const ref = this.dialog.open(OrderFormDialog, {
      width: '50%',
      data: { mode: 'create' },
    });

    ref
      .afterClosed()
      .subscribe(
        (result) =>
          result.success &&
          this.service
            .store(result.order)
            .subscribe(
              (created) =>
                (this.dataSource.data = this.dataSource.data.concat(tableRowFromOrder(created))),
            ),
      );
  }

  edit(id: number) {
    this.service.getByID(id).subscribe((order) => {
      const ref = this.dialog.open(OrderFormDialog, {
        width: '50%',
        data: { mode: 'edit', order },
      });

      ref
        .afterClosed()
        .subscribe(
          (result) =>
            result.success &&
            this.service
              .update(result.order, order.id)
              .subscribe(
                (updated) =>
                  (this.dataSource.data = this.dataSource.data.map((o) =>
                    o.id === updated.id ? tableRowFromOrder(updated) : o,
                  )),
              ),
        );
    });
  }

  // FIX: delete in backend
  delete(order: Order) {
    const ref = this.dialog.open(OrderDeleteDialog, {
      data: { order },
    });

    ref
      .afterClosed()
      .subscribe(
        (result: boolean) =>
          result &&
          this.service
            .delete(order.id)
            .subscribe(
              (deleted) =>
                (this.dataSource.data = this.dataSource.data.filter((o) => o.id !== deleted.id)),
            ),
      );
  }
}
