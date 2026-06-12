import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContactTableRow, tableRowFromContact } from '../../models/contact';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IsInRolesDirective } from '../../../auth/directives/app-is-in-roles.dir';
import { AppRoles } from '../../../app.roles';
import { MatDialog } from '@angular/material/dialog';

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
  delete(id: number) {
    console.log('TODO');
  }
}
