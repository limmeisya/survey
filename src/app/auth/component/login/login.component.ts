import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import Swal from 'sweetalert2';
import { AuthRequest, Role } from '../../model/IAuth';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private authService : AuthService) { }

  ngOnInit(): void {
  }


  loginForm: FormGroup = new FormGroup({
    nik : new FormControl(''),
    password : new FormControl(''),
  })

  clearForm(): void {
    this.loginForm.reset();
  }



  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginData : any = {nik:this.loginForm.value['nik'],
                          password:this.loginForm.value['password']}

      console.log(loginData);
      this.authService.login(loginData).subscribe({
        next : (res : any) => 
        {
          let userRole = ''
          res.data.role.forEach(function (role: any){
            userRole = role            
          })

          let dataSent = {nik:res.data.nik, role:userRole, token:res.data.token}
          this.authService.storeUser(dataSent)

          Swal.fire({
                  icon: 'success',
                  title: 'Login Success',
                  text: `Welcome ${res.data.nik}`
                }).then(() => {
                  if(userRole === Role.MANAGER ||userRole=== Role.SUPERVISOR ||userRole ===Role.STAFF){
                    console.log('ROLE: ', userRole);
                    this.router.navigateByUrl("/dashboard")   
                  }
                  else if(userRole === Role.CUSTOMER){
                    console.log('ROLE: ', userRole);
                    this.router.navigateByUrl(`/home`)   
                  }
                }) 
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: `Invalid login credentials`
          })
        }
      })
    }
  }

  register(){
    Swal.fire('Register button was clicked')
  }
}
