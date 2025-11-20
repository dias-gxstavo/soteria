import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtectMessagePage } from './protect-message.page';

describe('ProtectMessagePage', () => {
  let component: ProtectMessagePage;
  let fixture: ComponentFixture<ProtectMessagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
