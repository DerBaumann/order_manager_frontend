import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddForm } from './contact-add-form';

describe('ContactAddForm', () => {
  let component: ContactAddForm;
  let fixture: ComponentFixture<ContactAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactAddForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
