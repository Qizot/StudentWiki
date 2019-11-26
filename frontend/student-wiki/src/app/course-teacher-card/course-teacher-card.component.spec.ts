import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherCardComponent } from './course-teacher-card.component';

describe('CourseTeacherCardComponent', () => {
  let component: CourseTeacherCardComponent;
  let fixture: ComponentFixture<CourseTeacherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
