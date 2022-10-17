import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { PaginationResponse } from 'src/app/shared/model/PaginationResponse';
import { Transaction } from '../admin-survey.model';
import { AdminSurveyService } from '../admin-survey.service';

@Component({
  selector: 'app-adm-survey-list',
  templateUrl: './adm-survey-list.component.html',
  styleUrls: ['./adm-survey-list.component.css']
})
export class AdmSurveyListComponent implements OnInit {

    constructor(
    private route: ActivatedRoute,
    private readonly adminService: AdminSurveyService,
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
  // currentPaginate = {
  //   page: 1,
  //   size: 3,
  // };

  currentPaginate: { [key: string]: any } = {page: 1, size: 3};

  totalData: number = 0
  paginationSize: number = 0
  customerNik: string='';

  loadTransactionCustomer(){
    this.route.queryParams.pipe(
      switchMap((val) => {
        console.log('Val', val);
        
        return this.adminService.getAllTransaction(val).pipe(map(({data}) => {
          if (Object.getOwnPropertyNames(val).length !== 0) {
            return {params: val, data: data};
          } else {
            return {params: {page: 1, size: 3, direction: 'DESC'}, data: data};
          }
        }))
      }),
    ).subscribe({
      next: ({data}) => {
        console.log(data);
        this.listCustomerTransaction = data.data
        this.paginate = data;
      },
      error: console.error,
    })
  }

  fillSurvey(transactionId:string){
    console.log('TrxId: ', transactionId);
    this.router.navigateByUrl(`/adm-survey-form/${this.customerNik}/${transactionId}`)  
  }

  detailsSurvey(transactionId:string){
    this.router.navigateByUrl(`/adm-survey-details/${this.customerNik}/${transactionId}`)
  }

  pageChanged(page: any){
    this.currentPaginate = {...this.currentPaginate, page}
    this.router.navigateByUrl(`/adm-survey-list?page=${page}&size=${this.currentPaginate['size']}`);
    this.loadTransactionCustomer();
  }
}
