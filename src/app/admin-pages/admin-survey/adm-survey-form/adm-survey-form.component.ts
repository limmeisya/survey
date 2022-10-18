import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/auth/model/IAuth';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import Swal from 'sweetalert2';
import { AllSurveyReview, Banks, City, CustomerData, District, Province, Ward } from '../admin-survey.model';
import { AdminSurveyService } from '../admin-survey.service';
import allBank from './allBank.json'

@Component({
  selector: 'app-adm-survey-form',
  templateUrl: './adm-survey-form.component.html',
  styleUrls: ['./adm-survey-form.component.css']
})
export class AdmSurveyFormComponent implements OnInit {
  relativeProvince: Partial<Province> = {};
  relativeCity: Partial<City> = {};
  relativeDistrict: Partial<District> = {};
  relativeWard: Partial<Ward> = {};

  profileReview = new FormControl('');

  firstFormGroup: FormGroup = new FormGroup({
    surveyDataId: new FormControl(null),
    mothersMaidenName: new FormControl('', Validators.required),
    latestEducationalLevel: new FormControl('', Validators.required),
    dependents: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bankName: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
  });
  firstForm(property: string): FormGroup{
    return this.firstFormGroup.get(property) as FormGroup
  }
  
  secondFormGroup: FormGroup = new FormGroup({
    spouseId: new FormControl(null),
    spouseNik: new FormControl(null),
    spouseName: new FormControl(null),
    spouseBirthdate: new FormControl(null),
    gender: new FormControl(null),
    spouseBirthplace: new FormControl(null),
    spouseMothersMaidenName: new FormControl(null),
  });
  secondForm(property: string): FormGroup{
    return this.secondFormGroup.get(property) as FormGroup
  }

  thirdFormGroup: FormGroup = new FormGroup({
    relativesId: new FormControl(null),
    relativesName: new FormControl('', Validators.required),
    relativesRelation: new FormControl('', Validators.required),
    relativesPhoneNumber: new FormControl(''),
    relativesCellNumber: new FormControl('', [Validators.required]),
    relativesAddress: new FormControl('', Validators.required),
    relativesRt: new FormControl(''),
    relativesRw: new FormControl(''),
    relativesWard: new FormControl(this.relativeWard, Validators.required),
    relativesDistrict: new FormControl(this.relativeDistrict, Validators.required),
    relativesCity: new FormControl(this.relativeCity, Validators.required),
    relativesProvince: new FormControl(this.relativeProvince, Validators.required),
  });
  thirdForm(property: string): FormGroup{
    return this.thirdFormGroup.get(property) as FormGroup
  }

  profiles: any[] = [];

  forthFormGroup: FormGroup = new FormGroup({
    profileId: new FormControl(null),
    breadwinner: new FormControl('', Validators.required),
    literacyAbility: new FormControl('', Validators.required),
    transportationOwner: new FormControl('', Validators.required),
    insuranceOwner: new FormControl('', Validators.required),
    internetAccess: new FormControl('', Validators.required),
  });
  fourthForm(property: string): FormGroup{
    return this.forthFormGroup.get(property) as FormGroup
  }

  trxId: string = ''
  transactionForm: FormGroup = new FormGroup({
    trxId: new FormControl(this.trxId)
  });

  
  surveyForm: FormGroup = new FormGroup({
    surveyId: new FormControl(null),
    roleName: new FormControl(''),
    transaction: this.transactionForm,
    surveyData:this.firstFormGroup,
    profile:this.forthFormGroup,
    spouse:this.secondFormGroup,
    relatives:this.thirdFormGroup
  })

  constructor(
    private route: ActivatedRoute,
    private readonly adminSurvey: AdminSurveyService,
    private router: Router,
    private readonly authService: AuthService
  ) {}

  roleUser: string = ''
  ngOnInit(): void {
    this.loadProvinces();
    this.getCustomerData()
    this.getSurveyData()
    this.roleUser = this.authService.getUserFromStorage()!.role.toString()
  }

  today = new Date().toJSON().split('T')[0]

  submit() {
    Swal.fire({
      title: 'Do you want to submit the survey?',
      showDenyButton: true,
      confirmButtonText: `Submit`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Submit!', '', 'success');
        this.adminSurvey.postUpdateSurvey(this.surveyForm.value).subscribe({
          next: (res) => {
            this.router.navigateByUrl(`/adm-survey-details/${this.nikCustomer}/${res.data.transaction.trxId}`)
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'Failed to submit!'
            })
          }
        })
      }
    })
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
  nikCustomer: string =''
  getCustomerData(){
    this.route.params.subscribe((parameter) => {
      this.nikCustomer = parameter['id']
      if (parameter && parameter['id']){
        this.adminSurvey.getCustomerDataByNik(this.nikCustomer).subscribe((res: ApiResponse<CustomerData>) => {
          this.nik = res.data.nik
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

          this.adminSurvey.getWard(res.data.ward).subscribe((resp)=>{
            this.ward = resp.name
          })
          
          this.adminSurvey.getDistrict(res.data.district).subscribe((resp)=>{
            this.district = resp.name
          })
          
          this.adminSurvey.getProvice(res.data.province).subscribe((resp)=>{
            this.province = resp.name
          })
          
          this.adminSurvey.getCity(res.data.city).subscribe((resp)=>{
            this.city = resp.name
          })
          
          this.officeLocation = res.data.officeLocation
          this.businessPhoto = res.data.businessPhoto
          this.postalCode = res.data.postalCode
        })
      }
    })
  }

  surveyRes: AllSurveyReview | undefined;
  getSurveyData(){
    this.route.params.subscribe((parameter) => {
      if (parameter['id2']){
        this.adminSurvey.getSurveyByTrxId(parameter['id2']).subscribe({
          next: (res: ApiResponse<AllSurveyReview>) => {
            this.trxId = parameter['id2']
            this.transactionForm.controls['trxId'].setValue(this.trxId)
            this.surveyForm.controls['roleName'].setValue(this.roleUser)
            if (res.data !== null){
              Swal.fire({
                title: 'You have filled this survey.',
                text: 'Do you want to edit survey?',
                icon: 'question',
                confirmButtonText: `Edit`,
                showDenyButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  this.surveyRes = res.data;
                  this.setFormGroup(this.surveyRes);
                  this.loadAddressesApi();
                  this.profiles[0] = this.surveyRes.profile.breadwinner
                  this.profiles[1] = this.surveyRes.profile.literacyAbility
                  this.profiles[2] = this.surveyRes.profile.transportationOwner
                  this.profiles[3] = this.surveyRes.profile.insuranceOwner
                  this.profiles[4] = this.surveyRes.profile.internetAccess
                }else{
                  this.router.navigateByUrl(`/adm-survey-list`)
                }
              })
            }
          },
          error: (err) => alert ('Error!')
        })
      }
    })
  }

  loadAddressesApi(): void {
    this.adminSurvey.getProvice(this.surveyRes!.relatives?.relativesProvince).subscribe({
      next: (res: Province) => {
        this.relativeProvince = res;
        this.loadCity(this.relativeProvince.id);
      },
    });
    this.adminSurvey.getCity(this.surveyRes!.relatives?.relativesCity).subscribe({
      next: (res: City) => {
        this.relativeCity = res;
        this.loadDistrict(this.relativeCity.id);
      },
    });
    this.adminSurvey.getDistrict(this.surveyRes!.relatives?.relativesDistrict).subscribe({
      next: (res: District) => {
        this.relativeDistrict = res;
        this.loadWard(this.relativeDistrict.id);
      },
    });
    this.adminSurvey.getWard(this.surveyRes!.relatives?.relativesWard).subscribe({
      next: (res: Ward) => {
        this.relativeWard = res;
      },
    });
  }

  dataBanks: Banks[] = allBank;

  dataProvincies: Province[] = [];
  loadProvinces() {
    this.adminSurvey.getProvicies().subscribe({
      next: (res: Province[]) => {
        this.dataProvincies = res;
      },
    });
  }

  dataCities: City[] = [];
  loadCity(provId: any) {
    this.adminSurvey.getCities(provId).subscribe({
      next: (res: City[]) => {
        this.dataCities = res;
      },
      error: (err) => alert ('Failed load city!')
    });
  }

  dataDistricts: District[] = [];
  loadDistrict(cityId: any) {
    this.adminSurvey.getDistricts(cityId).subscribe({
      next: (res: District[]) => {
        this.dataDistricts = res;
      },
    });
  }

  dataWards: Ward[] = [];
  loadWard(districtId: any) {
    this.adminSurvey.getWards(districtId).subscribe({
      next: (res: Ward[]) => {
        this.dataWards = res;
      },
    });
  }

  setFormGroup(surveyForm: AllSurveyReview){
    this.surveyForm.controls['surveyId'].setValue(surveyForm.surveyId)

    this.firstFormGroup.controls['surveyDataId'].setValue(surveyForm.surveyData.surveyDataId)
    this.firstFormGroup.controls['mothersMaidenName'].setValue(surveyForm.surveyData.mothersMaidenName)
    this.firstFormGroup.controls['latestEducationalLevel'].setValue(surveyForm.surveyData.latestEducationalLevel)
    this.firstFormGroup.controls['dependents'].setValue(surveyForm.surveyData.dependents)
    this.firstFormGroup.controls['email'].setValue(surveyForm.surveyData.email)
    this.firstFormGroup.controls['bankName'].setValue(surveyForm.surveyData.bankName)
    this.firstFormGroup.controls['accountName'].setValue(surveyForm.surveyData.accountName)
    this.firstFormGroup.controls['accountNumber'].setValue(surveyForm.surveyData.accountNumber)

    this.secondFormGroup.controls['spouseId'].setValue(surveyForm.spouse.spouseId)
    this.secondFormGroup.controls['spouseNik'].setValue(surveyForm.spouse.spouseNik)
    this.secondFormGroup.controls['spouseName'].setValue(surveyForm.spouse.spouseName)
    if(surveyForm.spouse.spouseBirthdate) {
      let datepipe: DatePipe = new DatePipe('en-US');
      let date = datepipe.transform(new Date(surveyForm.spouse.spouseBirthdate),'YYYY-MM-dd')!;
      this.secondFormGroup.controls['spouseBirthdate'].setValue(date)
    }
    this.secondFormGroup.controls['gender'].setValue(surveyForm.spouse.gender)
    this.secondFormGroup.controls['spouseBirthplace'].setValue(surveyForm.spouse.spouseBirthplace)
    this.secondFormGroup.controls['spouseMothersMaidenName'].setValue(surveyForm.spouse.spouseMothersMaidenName)

    this.thirdFormGroup.controls['relativesId'].setValue(surveyForm.relatives.relativesId)
    this.thirdFormGroup.controls['relativesName'].setValue(surveyForm.relatives.relativesName)
    this.thirdFormGroup.controls['relativesRelation'].setValue(surveyForm.relatives.relativesRelation)
    this.thirdFormGroup.controls['relativesPhoneNumber'].setValue(surveyForm.relatives.relativesPhoneNumber)
    this.thirdFormGroup.controls['relativesCellNumber'].setValue(surveyForm.relatives.relativesCellNumber)
    this.thirdFormGroup.controls['relativesAddress'].setValue(surveyForm.relatives.relativesAddress)
    this.thirdFormGroup.controls['relativesRt'].setValue(surveyForm.relatives.relativesRt)
    this.thirdFormGroup.controls['relativesRw'].setValue(surveyForm.relatives.relativesRw)
    this.thirdFormGroup.controls['relativesWard'].setValue(surveyForm.relatives.relativesWard)
    this.thirdFormGroup.controls['relativesDistrict'].setValue(surveyForm.relatives.relativesDistrict)
    this.thirdFormGroup.controls['relativesCity'].setValue(surveyForm.relatives.relativesCity)
    this.thirdFormGroup.controls['relativesProvince'].setValue(surveyForm.relatives.relativesProvince)

    this.forthFormGroup.controls['profileId'].setValue(surveyForm.profile.profileId)
    this.forthFormGroup.controls['breadwinner'].setValue(surveyForm.profile.breadwinner)
    this.forthFormGroup.controls['literacyAbility'].setValue(surveyForm.profile.literacyAbility)
    this.forthFormGroup.controls['transportationOwner'].setValue(surveyForm.profile.transportationOwner)
    this.forthFormGroup.controls['insuranceOwner'].setValue(surveyForm.profile.insuranceOwner)
    this.forthFormGroup.controls['internetAccess'].setValue(surveyForm.profile.internetAccess)

    this.transactionForm.controls['trxId'].setValue(surveyForm.transaction.trxId)
  }

  back(){
    this.router.navigateByUrl(`/adm-survey-list`)
  }
}
