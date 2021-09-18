import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTasksHeaderComponent } from './coach-tasks-header.component';

describe('CoachTasksHeaderComponent', () => {
  let component: CoachTasksHeaderComponent;
  let fixture: ComponentFixture<CoachTasksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachTasksHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachTasksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
