import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamRemovePlayerComponent } from './admin-team-remove-player.component';

describe('AdminTeamRemovePlayerComponent', () => {
  let component: AdminTeamRemovePlayerComponent;
  let fixture: ComponentFixture<AdminTeamRemovePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeamRemovePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamRemovePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
