import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupMasterPasswordPage } from './setup-master-password.page';

describe('SetupMasterPasswordPage', () => {
  let component: SetupMasterPasswordPage;
  let fixture: ComponentFixture<SetupMasterPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMasterPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
