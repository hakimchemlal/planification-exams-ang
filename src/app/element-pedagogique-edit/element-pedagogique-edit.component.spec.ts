import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPedagogiqueEditComponent } from './element-pedagogique-edit.component';

describe('ElementPedagogiqueEditComponent', () => {
  let component: ElementPedagogiqueEditComponent;
  let fixture: ComponentFixture<ElementPedagogiqueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementPedagogiqueEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementPedagogiqueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
