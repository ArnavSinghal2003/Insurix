import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Claimcard } from './claimcard';

describe('Claimcard', () => {
  let component: Claimcard;
  let fixture: ComponentFixture<Claimcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Claimcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Claimcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
