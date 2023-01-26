import { TestBed } from '@angular/core/testing';

import { BondesortieService } from './bondesortie.service';

describe('BondesortieService', () => {
  let service: BondesortieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondesortieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
