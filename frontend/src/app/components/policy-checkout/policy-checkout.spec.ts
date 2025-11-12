import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCheckout } from './policy-checkout';

describe('PolicyCheckout', () => {
  let component: PolicyCheckout;
  let fixture: ComponentFixture<PolicyCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
