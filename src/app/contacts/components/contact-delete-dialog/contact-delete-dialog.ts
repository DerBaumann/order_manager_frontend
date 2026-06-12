import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Contact } from '../../models/contact';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './contact-delete-dialog.html',
  styleUrl: './contact-delete-dialog.scss',
})
export class ContactDeleteDialog {
  data: { contact: Contact } = inject(MAT_DIALOG_DATA);
}
