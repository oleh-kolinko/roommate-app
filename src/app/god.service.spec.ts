import { TestBed, inject } from '@angular/core/testing';

import { GodService } from './god.service';

describe('GodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GodService]
    });
  });

  it('should ...', inject([GodService], (service: GodService) => {
    expect(service).toBeTruthy();
  }));
});
