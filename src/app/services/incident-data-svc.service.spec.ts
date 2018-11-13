import { TestBed } from '@angular/core/testing';

import { IncidentDataSvcService } from './incident-data-svc.service';

describe('IncidentDataSvcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncidentDataSvcService = TestBed.get(IncidentDataSvcService);
    expect(service).toBeTruthy();
  });
});
