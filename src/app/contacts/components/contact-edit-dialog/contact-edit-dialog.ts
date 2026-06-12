import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactTableRow, CreateContact } from '../../models/contact';

interface EditResult {
  success: boolean;
  contact?: CreateContact;
}

@Component({
  selector: 'app-contact-edit-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-edit-dialog.html',
  styleUrl: './contact-edit-dialog.scss',
})
export class ContactEditDialog {
  protected readonly data: { contact?: ContactTableRow } = inject(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<EditResult>);

  contactFrom = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    street: ['', Validators.required],
    placeName: ['', Validators.required],
    postCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    canton: ['', Validators.required],
  });

  constructor() {
    if (this.data.contact) this.contactFrom.patchValue(this.data.contact);
  }

  cancel() {
    this.dialogRef.close({ success: false });
  }

  save() {
    if (!this.contactFrom.valid) this.dialogRef.close({ success: false });

    const data = this.contactFrom.value;
    const { data: createContact, error } = CreateContact.safeParse(data);
    if (error) this.dialogRef.close({ success: false });

    this.dialogRef.close({ success: true, contact: createContact });
  }
}
