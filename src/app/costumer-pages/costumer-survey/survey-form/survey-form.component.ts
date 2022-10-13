import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import Swal from 'sweetalert2';
import { CostumerSurveyService } from '../costumer-survey.service';
import {
  AllSurveyReview,
  Banks,
  City,
  CustomerData,
  CustomerSurveyData,
  District,
  ProfilingData,
  Province,
  RelativesData,
  SpouseData,
  Ward,
} from '../customer-survey.model';
import { DatePipe } from '@angular/common';
import allBank from './allBank.json'

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
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
  secondFormGroup: FormGroup = new FormGroup({
    spouseId: new FormControl(null),
    spouseNik: new FormControl('', Validators.required),
    spouseName: new FormControl('', Validators.required),
    spouseBirthdate: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required),
    spouseBirthplace: new FormControl('', Validators.required),
    spouseMothersMaidenName: new FormControl('', Validators.required),
  });
  thirdFormGroup: FormGroup = new FormGroup({
    relativesId: new FormControl(null),
    relativesName: new FormControl('', Validators.required),
    relativesRelation: new FormControl('', Validators.required),
    relativesPhoneNumber: new FormControl(''),
    relativesCellNumber: new FormControl('', Validators.required),
    relativesAddress: new FormControl('', Validators.required),
    relativesRt: new FormControl(''),
    relativesRw: new FormControl(''),
    relativesWard: new FormControl(this.relativeWard, Validators.required),
    relativesDistrict: new FormControl(this.relativeDistrict, Validators.required),
    relativesCity: new FormControl(this.relativeCity, Validators.required),
    relativesProvince: new FormControl(this.relativeProvince, Validators.required),
  });

  profiles: any[] = [];

  forthFormGroup: FormGroup = new FormGroup({
    profileId: new FormControl(null),
    breadwinner: new FormControl('', Validators.required),
    literacyAbility: new FormControl('', Validators.required),
    transportationOwner: new FormControl('', Validators.required),
    insuranceOwner: new FormControl('', Validators.required),
    internetAccess: new FormControl('', Validators.required),
  });

  surveyForm: FormGroup = new FormGroup({
    surveyId: new FormControl(''),
    surveyData:this.firstFormGroup,
    profile:this.forthFormGroup,
    spouse:this.secondFormGroup,
    relatives:this.thirdFormGroup
  })

  constructor(
    private route: ActivatedRoute,
    private readonly customerService: CostumerSurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProvinces();
    this.getCustomerData()
    this.getSurveyData()
  }


  formOne(property: string): FormGroup {
    return this.firstFormGroup.get(property) as FormGroup;
  }

  surveyId: string = ''
  submit() {
    this.route.params.subscribe((parameter) => {
      if (parameter['id2']){
        console.log('SURVEY ID Before Update: ', parameter['id2']);
        Swal.fire({
          title: 'Do you want to update the survey?',
          showDenyButton: true,
          confirmButtonText: `Update`,
          denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Updated!', '', 'success');
            this.customerService.updateSurvey(this.surveyForm.value).subscribe((res) => {
              this.surveyId = res.data.surveyId
              console.log("Survey Id after Update ", this.surveyId);
              this.router.navigateByUrl(`/cust-survey-details/${this.nikCustomer}/${this.surveyId}`)
            });
          }
        })
      }else{
        Swal.fire({
          title: 'Do you want to submit the survey?',
          showDenyButton: true,
          confirmButtonText: `Submit`,
          denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Submited!', '', 'success');
            this.customerService.postSurvey(this.surveyForm.value).subscribe((res) => {
              this.surveyId = res.data.surveyId
              console.log("Survey Id is ", this.surveyId);
              this.router.navigateByUrl(`/cust-survey-details/${this.nikCustomer}/${this.surveyId}`)
            });
          }
        })
      }
    })
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
  nikCustomer: string =''
  getCustomerData(){
    this.route.params.subscribe((parameter) => {
      this.nikCustomer = parameter['id']
      if (parameter && parameter['id']){
        this.customerService.getCustomerDataByNik(this.nikCustomer).subscribe((res: ApiResponse<CustomerData>) => {
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
        console.log(parameter['id2']);
        this.customerService.getSurveyById(parameter['id2']).subscribe((res: ApiResponse<AllSurveyReview>) => {
          console.log('Survey DATA for Edit: ', res.data);
          this.surveyRes = res.data;
          this.setFormGroup(this.surveyRes);
          this.loadAddressesApi();
          this.profiles[0] = this.surveyRes.profile.breadwinner
          this.profiles[1] = this.surveyRes.profile.literacyAbility
          this.profiles[2] = this.surveyRes.profile.transportationOwner
          this.profiles[3] = this.surveyRes.profile.insuranceOwner
          this.profiles[4] = this.surveyRes.profile.internetAccess
        })
      }
    })
  }

  loadAddressesApi(): void {
    this.customerService.getProvice(this.surveyRes!.relatives?.relativesProvince).subscribe({
      next: (res: Province) => {
        this.relativeProvince = res;
        this.loadCity(this.relativeProvince.id);
      },
    });
    this.customerService.getCity(this.surveyRes!.relatives?.relativesCity).subscribe({
      next: (res: City) => {
        this.relativeCity = res;
        this.loadDistrict(this.relativeCity.id);
      },
    });
    this.customerService.getDistrict(this.surveyRes!.relatives?.relativesDistrict).subscribe({
      next: (res: District) => {
        this.relativeDistrict = res;
        this.loadWard(this.relativeDistrict.id);
      },
    });
    this.customerService.getWard(this.surveyRes!.relatives?.relativesWard).subscribe({
      next: (res: Ward) => {
        this.relativeWard = res;
      },
    });
  }


  dataBanks: Banks[] = allBank;
  // loadBanks() {
  //   this.customerService.getBanks().subscribe({
  //     next: (res: Banks[]) => {
  //       this.dataBanks = res;
  //     },
  //   });
  // }

  dataProvincies: Province[] = [];
  loadProvinces() {
    this.customerService.getProvicies().subscribe({
      next: (res: Province[]) => {
        this.dataProvincies = res;
      },
    });
  }

  dataCities: City[] = [];
  loadCity(provId: any) {
    console.log('Prov ID: ', provId);
    this.customerService.getCities(provId).subscribe({
      next: (res: City[]) => {
        this.dataCities = res;
      },
      error: (err) => alert ('Failed load city!')
    });
  }

  dataDistricts: District[] = [];
  loadDistrict(cityId: any) {
    this.customerService.getDistricts(cityId).subscribe({
      next: (res: District[]) => {
        this.dataDistricts = res;
      },
    });
  }

  dataWards: Ward[] = [];
  loadWard(districtId: any) {
    this.customerService.getWards(districtId).subscribe({
      next: (res: Ward[]) => {
        this.dataWards = res;
      },
    });
  }

  // pageTitle: String = 'Profiling Customer'

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
  }
}
