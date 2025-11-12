import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPolicies } from './category-policies';

describe('CategoryPolicies', () => {
  let component: CategoryPolicies;
  let fixture: ComponentFixture<CategoryPolicies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPolicies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPolicies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
