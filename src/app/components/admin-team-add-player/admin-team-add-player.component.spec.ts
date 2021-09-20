import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamAddPlayerComponent } from './admin-team-add-player.component';

describe('AdminTeamAddPlayerComponent', () => {
  let component: AdminTeamAddPlayerComponent;
  let fixture: ComponentFixture<AdminTeamAddPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeamAddPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamAddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
