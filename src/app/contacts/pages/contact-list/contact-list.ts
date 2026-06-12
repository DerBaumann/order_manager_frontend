import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contact, ContactTableRow, tableRowFromContact } from '../../models/contact';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IsInRolesDirective } from '../../../auth/directives/app-is-in-roles.dir';
import { AppRoles } from '../../../app.roles';
import { MatDialog } from '@angular/material/dialog';
import { ContactDeleteDialog } from '../../components/contact-delete-dialog/contact-delete-dialog';
import { ContactFormDialog } from '../../components/contact-form-dialog/contact-form-dialog';

@Component({
  selector: 'app-contact-list',
  imports: [MatIconModule, MatTableModule, MatSortModule, MatButtonModule, IsInRolesDirective],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  private readonly service = inject(ContactService);
  private readonly dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;

  protected readonly roles = AppRoles;

  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'phone',
    'street',
    'placeName',
    'postCode',
    'canton',
    'actions',
  ];
  dataSource = new MatTableDataSource<ContactTableRow>();

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = () =>
    this.service.getAll().subscribe((c) => (this.dataSource.data = c.map(tableRowFromContact)));

  create() {
    const ref = this.dialog.open(ContactFormDialog, {
      width: '50%',
      data: { mode: 'create' },
    });

    ref
      .afterClosed()
      .subscribe(
        (result) =>
          result.success &&
          this.service
            .store(result.contact)
            .subscribe(
              (created) =>
                (this.dataSource.data = this.dataSource.data.concat(tableRowFromContact(created))),
            ),
      );
  }

  edit(contact: Contact) {
    const ref = this.dialog.open(ContactFormDialog, {
      width: '50%',
      data: { mode: 'edit', contact },
    });

    ref
      .afterClosed()
      .subscribe(
        (result) =>
          result.success &&
          this.service
            .update(result.contact, contact.id)
            .subscribe(
              (updated) =>
                (this.dataSource.data = this.dataSource.data.map((c) =>
                  c.id === updated.id ? tableRowFromContact(updated) : c,
                )),
            ),
      );
  }

  delete(contact: Contact) {
    const ref = this.dialog.open(ContactDeleteDialog, {
      data: { contact },
    });

    ref
      .afterClosed()
      .subscribe(
        (result: boolean) =>
          result &&
          this.service
            .delete(contact.id)
            .subscribe(
              (deleted) =>
                (this.dataSource.data = this.dataSource.data.filter((c) => c.id !== deleted.id)),
            ),
      );
  }
}
