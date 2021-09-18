import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachNewTaskDialogComponent } from './coach-new-task-dialog.component';

describe('CoachNewTaskDialogComponent', () => {
  let component: CoachNewTaskDialogComponent;
  let fixture: ComponentFixture<CoachNewTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachNewTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachNewTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
