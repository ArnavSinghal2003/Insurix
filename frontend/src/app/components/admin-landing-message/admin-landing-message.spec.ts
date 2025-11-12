import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLandingMessage } from './admin-landing-message';

describe('AdminLandingMessage', () => {
  let component: AdminLandingMessage;
  let fixture: ComponentFixture<AdminLandingMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLandingMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLandingMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
