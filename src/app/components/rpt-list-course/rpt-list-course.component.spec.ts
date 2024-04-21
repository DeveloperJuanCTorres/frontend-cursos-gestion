import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptListCourseComponent } from './rpt-list-course.component';

describe('RptListCourseComponent', () => {
  let component: RptListCourseComponent;
  let fixture: ComponentFixture<RptListCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RptListCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RptListCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
