import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkoutconfirmation } from './checkoutconfirmation';

describe('Checkoutconfirmation', () => {
  let component: Checkoutconfirmation;
  let fixture: ComponentFixture<Checkoutconfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkoutconfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Checkoutconfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
