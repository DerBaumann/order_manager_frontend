import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ContactTableRow } from '../../models/contact';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './contact-delete-dialog.html',
  styleUrl: './contact-delete-dialog.scss',
})
export class ContactDeleteDialog {
  protected readonly data: { contact: ContactTableRow } = inject(MAT_DIALOG_DATA);
}
