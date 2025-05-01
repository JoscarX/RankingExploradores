import { TestBed } from '@angular/core/testing';

import { CompetenciaSupervivenciaServiceService } from './competencia-supervivencia-service.service';

describe('CompetenciaSupervivenciaServiceService', () => {
  let service: CompetenciaSupervivenciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenciaSupervivenciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
