import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDeleteDialog } from './contact-delete-dialog';

describe('ContactDeleteDialog', () => {
  let component: ContactDeleteDialog;
  let fixture: ComponentFixture<ContactDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
