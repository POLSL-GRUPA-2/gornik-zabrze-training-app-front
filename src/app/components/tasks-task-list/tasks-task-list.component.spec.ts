import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTaskListComponent } from './tasks-task-list.component';

describe('TasksTaskListComponent', () => {
  let component: TasksTaskListComponent;
  let fixture: ComponentFixture<TasksTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
