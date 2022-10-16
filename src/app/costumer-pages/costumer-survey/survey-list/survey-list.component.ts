import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { CostumerSurveyService } from '../costumer-survey.service';
import { LoanType, Transaction } from '../customer-survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private readonly customerService: CostumerSurveyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactionCustomer()
  }

  listCustomerTransaction: Transaction[] = []
  isLoading: boolean= false

  public hasData(): boolean {
    return (this.listCustomerTransaction != null && this.listCustomerTransaction.length > 0);
  }

  loadTransactionCustomer(){
    this.route.params.subscribe((parameter) => {
      if (parameter['id']){
        this.customerService.getTransactionById(parameter['id']).subscribe({
          next: (response) => {
            this.listCustomerTransaction = response.data.data
            console.log('List Customer Transaction: ', response.data.data);
          },
          error: (err) => alert ('Failed submit error!')
        })
      }
    })
  }

  fillSurvey(){
    this.router.navigateByUrl('/cust-survey-form')
  }

  detailsSurvey(){
    this.router.navigateByUrl('/cust-survey-details')
  }
}
