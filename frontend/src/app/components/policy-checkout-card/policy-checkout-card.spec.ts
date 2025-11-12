import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCheckoutCard } from './policy-checkout-card';

describe('PolicyCheckoutCard', () => {
  let component: PolicyCheckoutCard;
  let fixture: ComponentFixture<PolicyCheckoutCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyCheckoutCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyCheckoutCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
