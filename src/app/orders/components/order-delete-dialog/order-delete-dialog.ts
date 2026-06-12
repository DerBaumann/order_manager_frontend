import { Component, inject } from '@angular/core';
import { OrderTableRow } from '../../models/order';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './order-delete-dialog.html',
  styleUrl: './order-delete-dialog.scss',
})
export class OrderDeleteDialog {
  protected readonly data: { order: OrderTableRow } = inject(MAT_DIALOG_DATA);
}
