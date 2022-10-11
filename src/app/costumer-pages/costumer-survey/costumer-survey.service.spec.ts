import { TestBed } from '@angular/core/testing';

import { CostumerSurveyService } from './costumer-survey.service';

describe('CostumerSurveyService', () => {
  let service: CostumerSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumerSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
