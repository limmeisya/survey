import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminSurveyService } from './admin-survey.service';

describe('AdminSurveyService', () => {
  let service: AdminSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],

    });
    service = TestBed.inject(AdminSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
