import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CreateContact } from '../../models/contact';
import { ContactService } from '../../services/contact-service';

@Component({
  selector: 'app-contact-add-form',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, RouterLink],
  templateUrl: './contact-add-form.html',
  styleUrl: './contact-add-form.scss',
})
export class ContactAddForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly service = inject(ContactService);
  private readonly router = inject(Router);

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

  onSubmit() {
    if (!this.contactFrom.valid) return;

    const data = this.contactFrom.value;
    const { data: createContact, error } = CreateContact.safeParse(data);
    if (error) return;

    this.service.store(createContact).subscribe({
      next: () => this.router.navigate(['contacts']),
    });
  }
}
