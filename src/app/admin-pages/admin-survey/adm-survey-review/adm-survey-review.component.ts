import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/auth/model/IAuth';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import Swal from 'sweetalert2';
import { AllSurveyReview, CustomerData, Transaction } from '../admin-survey.model';
import { AdminSurveyService } from '../admin-survey.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-adm-survey-review',
  templateUrl: './adm-survey-review.component.html',
  styleUrls: ['./adm-survey-review.component.css']
})
export class AdmSurveyReviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private readonly adminService: AdminSurveyService,
    private readonly authService: AuthService,
    private router: Router
    ) { }

  roleUser: string = ''
  ngOnInit(): void {
    this.getCustomerData()
    this.getSurveyData()
    this.roleUser = this.authService.getUserFromStorage()!.role.toString()
  }

  nik: string = ''
  fullName: string = ''
  birthPlace: string = ''
  birthDate: Date = new Date()
  gender: string = ''
  maritalStatus: string = ''
  religion: string = ''
  phoneNumber: string = ''
  address: string = ''
  rt: string = ''
  rw: string = ''
  ward: string = ''
  district: string = ''
  city: string = ''
  province: string = ''
  officeLocation: string= ''
  businessPhoto: string= ''
  postalCode: string= ''
  occupationType: string = ''

  getCustomerData(){
    this.route.params.subscribe((parameter) => {
      if (parameter && parameter['id']){
        console.log('this.nik: ', parameter['id']);
        this.nik = parameter['id']
        console.log(parameter);
        this.adminService.getCustomerDataByNik(parameter['id']).subscribe((res: ApiResponse<CustomerData>) => {
          console.log(' this Data loan', res);
          this.fullName = res.data.fullName
          this.birthPlace = res.data.birthPlace
          this.birthDate = res.data.birthDate
          this.gender = res.data.gender
          this.occupationType = res.data.occupationType
          this.maritalStatus = res.data.maritalStatus
          this.religion = res.data.religion
          this.phoneNumber = res.data.phoneNumber
          this.address = res.data.address
          this.rw = res.data.rw
          this.rt = res.data.rt
          this.ward = res.data.ward
          this.district = res.data.district
          this.province = res.data.province
          this.city = res.data.city
          this.adminService.getWard(res.data.ward).subscribe((res)=>{
            this.ward = res.name
          })
          this.adminService.getDistrict(res.data.district).subscribe((res)=>{
            this.district = res.name
          })
          this.adminService.getCity(res.data.city).subscribe((res)=>{
            this.city = res.name
          })
          this.adminService.getProvice(res.data.province).subscribe((res)=>{
            this.province = res.name
          })
          this.officeLocation = res.data.officeLocation
          this.postalCode = res.data.postalCode
        })
      }
    })
  }


  mothersMaidenName: string = ''
  latestEducationalLevel: string = ''
  dependents: number = 0
  email: string = ''
  bankName: string = ''
  accountName: string = ''
  accountNumber: string = ''

  spouseNik: string = ''
  spouseName: string = ''
  spouseBirthdate: string = ''
  genderSpouse: string = ''
  spouseBirthplace: string = ''
  spouseMothersMaidenName: string = ''

  relativesName: string = ''
  relativesRelation: string = ''
  relativesPhoneNumber: string = ''
  relativesCellNumber: string = ''
  relativesAddress: string = ''
  relativesRt: string = ''
  relativesRw: string = ''
  relativesWard: string = ''
  relativesDistrict: string = ''
  relativesCity: string = ''
  relativesProvince: string = ''

  breadwinner: boolean = true
  literacyAbility: boolean = true
  transportationOwner: boolean = true
  insuranceOwner: boolean = true
  internetAccess: boolean = true

  trxId:string = ''

  getSurveyData(){
    this.route.params.subscribe((parameter) => {
      console.log('Trx ID in Details: ', parameter['id2']);
      this.trxId = parameter['id2']
      this.adminService.getSurveyByTrxId(parameter['id2']).subscribe({
        next: (res: ApiResponse<AllSurveyReview>) => {
          if(res.data){
            console.log('Data loan', res.data);
            this.mothersMaidenName = res.data.surveyData.mothersMaidenName
            this.latestEducationalLevel = res.data.surveyData.latestEducationalLevel
            this.dependents = res.data.surveyData.dependents
            this.email = res.data.surveyData.email
            this.bankName = res.data.surveyData.bankName
            this.accountName = res.data.surveyData.accountName
            this.accountNumber = res.data.surveyData.accountNumber
            this.spouseNik = res.data.spouse.spouseNik
            this.spouseName = res.data.spouse.spouseName
            this.spouseBirthdate = res.data.spouse.spouseBirthdate
            this.genderSpouse = res.data.spouse.gender
            this.spouseBirthplace = res.data.spouse.spouseBirthplace
            this.spouseMothersMaidenName = res.data.spouse.spouseMothersMaidenName
            this.relativesName = res.data.relatives.relativesName
            this.relativesRelation = res.data.relatives.relativesRelation
            this.relativesPhoneNumber = res.data.relatives.relativesPhoneNumber
            this.relativesCellNumber = res.data.relatives.relativesCellNumber
            this.relativesAddress = res.data.relatives.relativesAddress
            this.relativesRt = res.data.relatives.relativesRt
            this.relativesRw = res.data.relatives.relativesRw

            this.relativesWard = res.data.relatives.relativesWard
            this.adminService.getWard(res.data.relatives.relativesWard).subscribe((res)=>{
              this.relativesWard = res.name
            })
            this.adminService.getDistrict(res.data.relatives.relativesDistrict).subscribe((res)=>{
              this.relativesDistrict = res.name
            })
            this.adminService.getCity(res.data.relatives.relativesCity).subscribe((res)=>{
              this.relativesCity = res.name
            })
            this.adminService.getProvice(res.data.relatives.relativesProvince).subscribe((res)=>{
              this.relativesProvince = res.name
            })

            this.breadwinner = res.data.profile.breadwinner
            this.literacyAbility = res.data.profile.literacyAbility
            this.transportationOwner = res.data.profile.transportationOwner
            this.insuranceOwner = res.data.profile.insuranceOwner
            this.internetAccess = res.data.profile.internetAccess

          }else{
            Swal.fire({
              icon: 'error',
              title: 'No Data!',
              text: `You haven't fill the survey!`
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl(`/cust-survey-list/${this.nik}`)
              }
            })
          }
        },
        error: (err) => alert ('Error!')
      })
      
    })
  }

  edit(){
    if (this.roleUser === Role.STAFF){
      this.router.navigateByUrl(`/adm-survey-form/${this.nik}/${this.trxId}`)
    }else{
      this.ifNotStaff()
    }
  }

  back(){
    this.router.navigateByUrl(`/adm-survey-list`)
  }

  deleteSurvey(){
    if (this.roleUser === Role.STAFF){
      Swal.fire({
        title: 'Are you sure to delete this survey?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think',
      }).then((result)=>{
        if(result.value){
          this.adminService.deleteSurvey(this.trxId).subscribe({
            next: (res) => {
              Swal.fire('Removed')
            },
            error: (err) => alert (err.message)
          })
          this.router.navigateByUrl(`/adm-survey-list`)
        }
      })
    }else{
      this.ifNotStaff()
    }
  }

  ifNotStaff(){
    Swal.fire({
      icon: 'error',
      title: 'Sorry!',
      text: `You don't have authority!`
    })
    this.router.navigateByUrl(`/adm-survey-list`)
  }

}
