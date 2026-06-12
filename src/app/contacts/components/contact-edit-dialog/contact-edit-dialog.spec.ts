import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditDialog } from './contact-edit-dialog';

describe('ContactEditDialog', () => {
  let component: ContactEditDialog;
  let fixture: ComponentFixture<ContactEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEditDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
