import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { CostumerSurveyService } from '../costumer-survey.service';
import { LoanType } from '../customer-survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  constructor(
    private readonly customerService:  CostumerSurveyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  listLoan: LoanType[] = []
  isLoading: boolean= false

  public hasData(): boolean {
    return (this.listLoan != null && this.listLoan.length > 0);
  }

  loadProducts(){
  }

  fillSurvey(){
    this.router.navigateByUrl('/cust-survey-form')
  }

  detailsSurvey(){
    this.router.navigateByUrl('/cust-survey-details')
  }
}
