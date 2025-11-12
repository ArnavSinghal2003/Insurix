import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myclaims } from './myclaims';

describe('Myclaims', () => {
  let component: Myclaims;
  let fixture: ComponentFixture<Myclaims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myclaims]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myclaims);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
