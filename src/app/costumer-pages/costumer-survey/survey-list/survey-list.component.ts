import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { PaginationResponse } from 'src/app/shared/model/PaginationResponse';
import { CostumerSurveyService } from '../costumer-survey.service';
import { LoanType, Transaction } from '../customer-survey.model';
import { map, switchMap } from 'rxjs';

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

  paginate?: Omit<PaginationResponse<any>, "data">

  currentPaginate: { [key: string]: any } = {page: 1, size: 6};

  totalData: number = 0
  paginationSize: number = 0
  customerNik: string=''
  loadTransactionCustomer(){
    this.route.params.subscribe((parameter) => {
      if (parameter['id']){
        this.route.queryParams.pipe(
          switchMap((val) => {
            this.customerNik = parameter['id']
            return this.customerService.getTransactionById(this.customerNik,val).pipe(map(({data}) => {
              if (Object.getOwnPropertyNames(val).length !== 0) {
                return {params: val, data: data};
              } else {
                return {params: {page: 1, size: 6}, data: data};
              }
            }))
          }),
        ).subscribe({
          next: ({data}) => {
            this.listCustomerTransaction = data.data
            this.paginate = data;
          },
          error: console.error,
        })
      }
    })
  }
  
  fillSurvey(transactionId:string){
    this.router.navigateByUrl(`/cust-survey-form/${this.customerNik}/${transactionId}`)  
  }

  detailsSurvey(transactionId:string){
    this.router.navigateByUrl(`/cust-survey-details/${this.customerNik}/${transactionId}`)
  }

  pageChanged(page: any){
    this.currentPaginate = {...this.currentPaginate, page}
    this.router.navigateByUrl(`/cust-survey-list/${this.customerNik}?size=${this.currentPaginate['size']}&page=${page}`);
    this.loadTransactionCustomer();
  }
}
