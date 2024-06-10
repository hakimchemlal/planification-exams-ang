import { TestBed } from '@angular/core/testing';

import { ElementPedagogiqueService } from './element-pedagogique.service';

describe('ElementPedagogiqueService', () => {
  let service: ElementPedagogiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementPedagogiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
