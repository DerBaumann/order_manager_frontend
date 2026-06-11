import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContactTableRow, tableRowFromContact } from '../../models/contact';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  imports: [MatTableModule, MatSortModule, MatButtonModule, RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  private readonly service = inject(ContactService);
  @ViewChild(MatSort) sort!: MatSort;

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
  ];
  dataSource = new MatTableDataSource<ContactTableRow>();

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = () =>
    this.service.getAll().subscribe((c) => (this.dataSource.data = c.map(tableRowFromContact)));
}
