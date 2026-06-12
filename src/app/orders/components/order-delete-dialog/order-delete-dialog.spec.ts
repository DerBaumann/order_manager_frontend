import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeleteDialog } from './order-delete-dialog';

describe('OrderDeleteDialog', () => {
  let component: OrderDeleteDialog;
  let fixture: ComponentFixture<OrderDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
