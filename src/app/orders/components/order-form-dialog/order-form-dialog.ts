import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateOrder, OrderStatus, OrderPriority, Order } from '../../models/order';

interface EditResult {
  success: boolean;
  order?: CreateOrder;
}

@Component({
  selector: 'app-order-form-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './order-form-dialog.html',
  styleUrl: './order-form-dialog.scss',
})
export class OrderFormDialog {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<OrderFormDialog, EditResult>);

  protected readonly data: {
    mode: 'create' | 'edit';
    order?: Order;
  } = inject(MAT_DIALOG_DATA);

  protected readonly statuses = OrderStatus.options;
  protected readonly priorities = OrderPriority.options;

  readonly orderForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: ['OPEN' as OrderStatus, Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    priority: ['MEDIUM' as OrderPriority, Validators.required],
    category: ['', Validators.required],
    contactId: [0, [Validators.required, Validators.min(1)]],
    positions: this.fb.array([]),
  });

  get positions(): FormArray {
    return this.orderForm.get('positions') as FormArray;
  }

  constructor() {
    if (this.data.order) {
      this.orderForm.patchValue({
        name: this.data.order.name,
        description: this.data.order.description,
        status: this.data.order.status,
        startDate: this.data.order.startDate,
        endDate: this.data.order.endDate,
        priority: this.data.order.priority,
        category: this.data.order.category,
        contactId: this.data.order.contact.id,
      });

      this.data.order.positions.forEach((position) => {
        this.positions.push(
          this.fb.group({
            id: [position?.id ?? null],
            name: [position.name, Validators.required],
            description: [position.description ?? ''],
            amount: [position.amount, [Validators.required, Validators.min(1)]],
            price: [position.price, [Validators.required, Validators.min(0)]],
          }),
        );
      });
    }

    if (this.positions.length === 0) {
      this.addPosition();
    }
  }

  addPosition() {
    this.positions.push(
      this.fb.group({
        name: ['', Validators.required],
        description: [''],
        amount: [1, [Validators.required, Validators.min(1)]],
        price: [0, [Validators.required, Validators.min(0)]],
      }),
    );
  }

  removePosition(index: number) {
    this.positions.removeAt(index);
  }

  cancel() {
    this.dialogRef.close({ success: false });
  }

  save() {
    if (!this.orderForm.valid) {
      return this.dialogRef.close({ success: false });
    }

    const { data: order, error } = CreateOrder.safeParse(this.orderForm.getRawValue());

    if (error) {
      return this.dialogRef.close({ success: false });
    }

    this.dialogRef.close({
      success: true,
      order,
    });
  }
}
