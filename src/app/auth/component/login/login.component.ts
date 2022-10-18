import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void { }


  loginForm: FormGroup = new FormGroup({
    nik : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  })

  showPassword: boolean= false

  clearForm(): void {
    this.loginForm.reset();
  }

  login(){
    if(this.loginForm.valid){
      let loginData : any = {nik:this.loginForm.value['nik'],
                          password:this.loginForm.value['password']}
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
                    this.router.navigateByUrl("/dashboard")   
                  }
                  else if(userRole === Role.CUSTOMER){
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

  loginForms(property: string): FormGroup{
    return this.loginForm.get(property) as FormGroup
  }

  register(){
    Swal.fire('Register button was clicked')
  }
}
