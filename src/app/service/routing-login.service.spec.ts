import { TestBed } from '@angular/core/testing';

import { RoutingLoginService } from './routing-login.service';

describe('RoutingLoginService', () => {
  let service: RoutingLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
