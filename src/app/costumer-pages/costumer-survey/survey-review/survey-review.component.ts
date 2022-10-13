import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
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
  customerFullName: string = ''
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
        console.log(parameter);
        this.customerService.getCustomerDataByNik(parameter['id']).subscribe((res: ApiResponse<CustomerData>) => {
          console.log('Data loan', res);
          this.nik = res.data.nik
          this.customerFullName = res.data.customerFullName
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
          this.businessPhoto = res.data.businessPhoto
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

  surveyId:string = ''

  getSurveyData(){
    this.route.params.subscribe((parameter) => {
      if (parameter && parameter['id2']){
        console.log('Survey ID in Details: ', parameter['id2']);
        this.surveyId = parameter['id2']
        this.customerService.getSurveyById(parameter['id2']).subscribe((res: ApiResponse<AllSurveyReview>) => {
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
            this.breadwinner = res.data.profile.breadwinner
            this.literacyAbility = res.data.profile.literacyAbility
            this.transportationOwner = res.data.profile.transportationOwner
            this.insuranceOwner = res.data.profile.insuranceOwner
            this.internetAccess = res.data.profile.internetAccess
        })
      }
    })
  }

  edit(){
    this.router.navigateByUrl(`/cust-survey-form/${this.nik}/${this.surveyId}`)
  }
}
