import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { PaginationResponse } from 'src/app/shared/model/PaginationResponse';
import { CostumerSurveyService } from '../costumer-survey.service';
import { LoanType, Transaction } from '../customer-survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  paginate?: Omit<PaginationResponse<Transaction>, "data">
  currentPaginate = {
    page: 1,
    size: 3,
  };

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

  totalData: number = 0
  paginationSize: number = 0
  customerNik: string=''
  loadTransactionCustomer(){
    this.route.params.subscribe((parameter) => {
      if (parameter['id']){
        this.customerNik = parameter['id']
        this.customerService.getTransactionById(this.customerNik,{size:this.currentPaginate.size, page:this.currentPaginate.page}).subscribe({
          next: (response) => {
            this.listCustomerTransaction = response.data.data
            this.paginationSize = response.data.size
            this.totalData = response.data.totalElements
            console.log('List Customer Transaction: ', response.data.data);
          },
          error: (err) => alert ('Failed to load transaction!')
        })
      }
    })
  }

  fillSurvey(transactionId:string){
    console.log('TrxId: ', transactionId);
    this.router.navigateByUrl(`/cust-survey-form/${this.customerNik}/${transactionId}`)  
  }

  detailsSurvey(transactionId:string){
    this.router.navigateByUrl(`/cust-survey-details/${this.customerNik}/${transactionId}`)
  }

  pageChanged(page: any){
    console.log('pageChange: ', page);
    this.currentPaginate = {...this.currentPaginate, page}
    this.router.navigateByUrl(`/cust-survey-list/${this.customerNik}?size=${this.currentPaginate.size}&page=${page}`);
    this.loadTransactionCustomer();
  }

}
