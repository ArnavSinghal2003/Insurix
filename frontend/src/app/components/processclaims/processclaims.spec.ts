import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Processclaims } from './processclaims';

describe('Processclaims', () => {
  let component: Processclaims;
  let fixture: ComponentFixture<Processclaims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Processclaims]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Processclaims);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
