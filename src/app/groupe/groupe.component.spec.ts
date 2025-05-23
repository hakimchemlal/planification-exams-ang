import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeComponent } from './groupe.component';

describe('GroupeComponent', () => {
  let component: GroupeComponent;
  let fixture: ComponentFixture<GroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
