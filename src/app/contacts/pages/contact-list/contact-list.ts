import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contact, ContactTableRow, tableRowFromContact } from '../../models/contact';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IsInRolesDirective } from '../../../auth/directives/app-is-in-roles.dir';
import { AppRoles } from '../../../app.roles';
import { MatDialog } from '@angular/material/dialog';
import { ContactDeleteDialog } from '../../components/contact-delete-dialog/contact-delete-dialog';

@Component({
  selector: 'app-contact-list',
  imports: [
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    RouterLink,
    IsInRolesDirective,
  ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  private readonly service = inject(ContactService);
  private readonly router = inject(Router);
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

  // TODO: Add page
  edit = (id: number) => this.router.navigate(['contacts', 'edit', id]);

  // TODO: Implement delete
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
