import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managepolicies } from './managepolicies';

describe('Managepolicies', () => {
  let component: Managepolicies;
  let fixture: ComponentFixture<Managepolicies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managepolicies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managepolicies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
