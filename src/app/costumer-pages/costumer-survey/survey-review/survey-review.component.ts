import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import Swal from 'sweetalert2';
import { CostumerSurveyService } from '../costumer-survey.service';
import { AllSurveyReview, CustomerData } from '../customer-survey.model';

@Component({
  selector: 'app-survey-review',
  templateUrl: './survey-review.component.html',
  styleUrls: ['./survey-review.component.css']
})
export class SurveyReviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private readonly customerService: CostumerSurveyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCustomerData()
    this.getSurveyData()
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
        this.customerService.getCustomerDataByNik(parameter['id']).subscribe((res: ApiResponse<CustomerData>) => {
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
          this.customerService.getWard(res.data.ward).subscribe((res)=>{
            this.ward = res.name
          })
          this.customerService.getDistrict(res.data.district).subscribe((res)=>{
            this.district = res.name
          })
          this.customerService.getCity(res.data.city).subscribe((res)=>{
            this.city = res.name
          })
          this.customerService.getProvice(res.data.province).subscribe((res)=>{
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

  breadwinner: string = ''
  literacyAbility: string = ''
  transportationOwner: string = ''
  insuranceOwner: string = ''
  internetAccess: string = ''

  trxId:string = ''

  getSurveyData(){
    this.route.params.subscribe((parameter) => {
      console.log('Trx ID in Details: ', parameter['id2']);
      this.trxId = parameter['id2']
      this.customerService.getSurveyByTrxId(parameter['id2']).subscribe({
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

            if(res.data.relatives.relativesPhoneNumber){
              this.relativesPhoneNumber = res.data.relatives.relativesPhoneNumber
            }else{
              this.relativesPhoneNumber ='-'
            } 
            this.relativesCellNumber = res.data.relatives.relativesCellNumber
            this.relativesAddress = res.data.relatives.relativesAddress
            if(res.data.relatives.relativesRt){
              this.relativesRt = res.data.relatives.relativesRt
            }else{
              this.relativesRt = '-'
            }
            if(res.data.relatives.relativesRw){
              this.relativesRw = res.data.relatives.relativesRw
            }else{
              this.relativesRw = '-'
            }

            this.relativesWard = res.data.relatives.relativesWard
            this.customerService.getWard(res.data.relatives.relativesWard).subscribe((res)=>{
              this.relativesWard = res.name
            })
            this.customerService.getDistrict(res.data.relatives.relativesDistrict).subscribe((res)=>{
              this.relativesDistrict = res.name
            })
            this.customerService.getCity(res.data.relatives.relativesCity).subscribe((res)=>{
              this.relativesCity = res.name
            })
            this.customerService.getProvice(res.data.relatives.relativesProvince).subscribe((res)=>{
              this.relativesProvince = res.name
            })

            if (res.data.profile.breadwinner){
              this.breadwinner = 'Yes'
            }else this.breadwinner = 'No'

            if (res.data.profile.literacyAbility){
              this.literacyAbility = 'Yes'
            }else this.literacyAbility = 'No'

            if (res.data.profile.transportationOwner){
              this.transportationOwner = 'Yes'
            }else this.transportationOwner = 'No'

            if (res.data.profile.insuranceOwner){
              this.insuranceOwner = 'Yes'
            }else this.insuranceOwner = 'No'

            if (res.data.profile.internetAccess){
              this.internetAccess = 'Yes'
            }else this.internetAccess = 'No'
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
    // console.log(`/cust-survey-form/${this.nik}/${this.trxId}`);
    this.router.navigateByUrl(`/cust-survey-form/${this.nik}/${this.trxId}`)
  }

  back(){
    this.router.navigateByUrl(`/cust-survey-list/${this.nik}`)
  }
}