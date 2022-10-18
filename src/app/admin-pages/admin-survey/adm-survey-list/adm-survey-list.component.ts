import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { PaginationResponse } from 'src/app/shared/model/PaginationResponse';
import Swal from 'sweetalert2';
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

  currentPaginate: { [key: string]: any } = {page: 1, size: 3};

  totalData: number = 0
  paginationSize: number = 0
  customerNik: string='';

  loadTransactionCustomer(){
    this.route.queryParams.pipe(
      switchMap((val) => {
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
        this.listCustomerTransaction = data.data
        this.paginate = data;
      },
      error: console.error,
    })
  }

  pageChanged(page: any){
    this.currentPaginate = {...this.currentPaginate, page}
    this.router.navigateByUrl(`/adm-survey-list?page=${page}&size=${this.currentPaginate['size']}`);
    this.loadTransactionCustomer();
  }

  fillSurvey(transactionId:string){
    console.log('TrxId: ', transactionId);
    this.router.navigateByUrl(`/adm-survey-form/${this.customerNik}/${transactionId}`)  
  }

  detailsSurvey(transactionId:string){
    this.router.navigateByUrl(`/adm-survey-details/${this.customerNik}/${transactionId}`)
  }

  deleteSurvey(transactionId:string){
    this.adminService.getTransactionByTrxId(transactionId).subscribe({
      next: (res: ApiResponse<Transaction>) => {
        if (res.data.isSurvey === true){
          Swal.fire({
            title: 'Are you sure to delete this survey?',
            text: 'This process is irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, go ahead.',
            cancelButtonText: 'No, let me think',
          }).then((result)=>{
            if(result.value){
              this.adminService.deleteSurvey(transactionId).subscribe({
                next: (res) => {
                  this.loadTransactionCustomer()
                  console.log("delete success");
                  
                  Swal.fire('Removed')
                },
                error: (err) => alert (err.message)
              })
              
            }
          })
        }
      },
      error: (err) => alert (`Error! Data not available`)
    })
  }
}
