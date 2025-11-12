import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mypolicies } from './mypolicies';

describe('Mypolicies', () => {
  let component: Mypolicies;
  let fixture: ComponentFixture<Mypolicies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mypolicies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mypolicies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
