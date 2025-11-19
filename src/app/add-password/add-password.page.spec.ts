import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPasswordPage } from './add-password.page';

describe('AddPasswordPage', () => {
  let component: AddPasswordPage;
  let fixture: ComponentFixture<AddPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
