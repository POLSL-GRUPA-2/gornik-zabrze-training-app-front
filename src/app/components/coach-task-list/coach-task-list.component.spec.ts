import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTaskListComponent } from './coach-task-list.component';

describe('CoachTasksListComponent', () => {
  let component: CoachTaskListComponent;
  let fixture: ComponentFixture<CoachTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
