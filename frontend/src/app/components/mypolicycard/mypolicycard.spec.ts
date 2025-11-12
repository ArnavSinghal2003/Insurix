import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mypolicycard } from './mypolicycard';

describe('Mypolicycard', () => {
  let component: Mypolicycard;
  let fixture: ComponentFixture<Mypolicycard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mypolicycard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mypolicycard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
