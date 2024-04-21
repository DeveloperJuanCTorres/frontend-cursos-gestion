import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAssignComponent } from './courses-assign.component';

describe('CoursesAssignComponent', () => {
  let component: CoursesAssignComponent;
  let fixture: ComponentFixture<CoursesAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
