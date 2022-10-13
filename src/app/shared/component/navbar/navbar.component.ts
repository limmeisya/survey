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
    console.log();
    if(this.authService.getUserFromStorage()?.role){
      this.identifierForView = this.authService.getUserFromStorage()!.identifier
      if(this.authService.getUserFromStorage()?.role!==Role.CUSTOMER){
      this.roleForView = this.authService.getUserFromStorage()!.role.toString().slice(5)
      this.roleAdminCheck = true
      }
    }
  }

  logOut(){
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

  // surveyFormRoute(){
  //   if(this.roleAdminCheck) {
  //     if(this.roleAdminCheck){
  //       this.route.navigateByUrl('/admin-new-survey')
  //     } else{
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Sorry...',
  //         text: `You don't have authority to access this page!`
  //       })
  //     }
  //   }else {
  //     // this.route.navigateByUrl('/customer-survey-form')
  //     this.customerService.getLoginInfo().subscribe((info)=>{
  //       this.nik = info.identifier
  //       console.log('NIK: ', this.nik);
  //       this.route.navigateByUrl('/customer-survey-form/' + this.nik)
  //     })
  //   }
  // }

  surveyRoute(){
     if(this.roleAdminCheck) this.route.navigateByUrl('/admin-survey-list')
      else{
        // this.route.navigateByUrl('/cust-survey-list')
        this.customerService.getLoginInfo().subscribe((info)=>{
          this.nik = info.identifier
          console.log('NIK: ', this.nik);
          this.route.navigateByUrl('/cust-survey-form/' + this.nik)
        })
      }
  }

  // surveyReviewRoute(){
  //   if(this.roleAdminCheck) {
  //     this.surveyList = 'Survey List'
  //     this.route.navigateByUrl('/admin-survey-list')
  //   }else {
  //     this.surveyList = 'Survey List'
  //     this.route.navigateByUrl('/customer-survey-details')
  //   }
  // }

  approvalRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-approval')
    else this.route.navigateByUrl('/approval')
  }

  disbursementRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-disbursement')
    else this.route.navigateByUrl('/disbursement')
  }
}
