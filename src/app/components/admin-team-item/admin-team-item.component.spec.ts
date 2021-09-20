import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamItemComponent } from './admin-team-item.component';

describe('AdminTeamItemComponent', () => {
  let component: AdminTeamItemComponent;
  let fixture: ComponentFixture<AdminTeamItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeamItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
