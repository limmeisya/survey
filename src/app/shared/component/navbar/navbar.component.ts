import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/model/IAuth';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CostumerSurveyService } from 'src/app/costumer-pages/costumer-survey/costumer-survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route : Router, private authService : AuthService, private readonly customerService: CostumerSurveyService) { }

  identifierForView : string = ""
  roleForView : string  = ""
  roleAdminCheck : Boolean = false

  nik: string =""

  ngOnInit(): void {
    if(this.authService.getUserFromStorage()?.role){
      this.identifierForView = this.authService.getUserFromStorage()!.nik
      if(this.authService.getUserFromStorage()?.role !== Role.CUSTOMER){
      this.roleForView = this.authService.getUserFromStorage()!.role.toString().slice(5)
      this.roleAdminCheck = true
      this.customerName = this.authService.getUserFromStorage()!.nik
      }else{
        this.roleForView = this.authService.getUserFromStorage()!.role.toString().slice(5)
        this.getCustomerData(this.identifierForView)
      }
    }
  }
  customerName: string= ''
  getCustomerData(nik:any){
    this.customerService.getCustomerDataByNik(nik).subscribe({
      next: (res) => {
        this.customerName= res.data.fullName
      },
      error: (err) => alert('Failed to get data!')
    })
  }

  logout(){
    sessionStorage.clear()
    this.route.navigateByUrl('/login')
  }

  dashboardRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/dashboard')
    else this.route.navigateByUrl('/home')
  }

  prospectRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-prospect')
    else this.route.navigateByUrl('/prospect')
  }

  creditSubmissionRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-credit-submission')
    else this.route.navigateByUrl('/credit-submission')
  }

  surveyRoute(){
     if(this.roleAdminCheck) this.route.navigateByUrl('/adm-survey-list')
      else{
        this.nik = this.authService.getUserFromStorage()!.nik
        this.route.navigateByUrl(`/cust-survey-list/${this.nik}`)
      }
  }

  approvalRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-approval')
    else this.route.navigateByUrl('/approval')
  }

  disbursementRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-disbursement')
    else this.route.navigateByUrl('/disbursement')
  }
}
