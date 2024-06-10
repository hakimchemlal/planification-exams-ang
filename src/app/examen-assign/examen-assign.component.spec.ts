import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenAssignComponent } from './examen-assign.component';

describe('ExamenAssignComponent', () => {
  let component: ExamenAssignComponent;
  let fixture: ComponentFixture<ExamenAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamenAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamenAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
