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
import Swal from 'sweetalert2';
import { CostumerSurveyService } from '../costumer-survey.service';
import {
  Banks,
  City,
  CustomerSurveyData,
  District,
  ProfilingData,
  Province,
  RelativesData,
  SpouseData,
  Ward,
} from '../customer-survey.model';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
  profileReview = new FormControl('');

  firstFormGroup: FormGroup = new FormGroup({
    surveyDataId: new FormControl(''),
    mothersMaidenName: new FormControl('', Validators.required),
    latestEducationalLevel: new FormControl('', Validators.required),
    dependents: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bankName: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
  });
  secondFormGroup: FormGroup = new FormGroup({
    spouseId: new FormControl(''),
    spouseNik: new FormControl('', Validators.required),
    spouseName: new FormControl('', Validators.required),
    spouseBirthdate: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required),
    spouseBirthplace: new FormControl('', Validators.required),
    spouseMothersMaidenName: new FormControl('', Validators.required),
  });
  thirdFormGroup: FormGroup = new FormGroup({
    relativesId: new FormControl(''),
    relativesName: new FormControl('', Validators.required),
    relativesRelation: new FormControl('', Validators.required),
    relativesPhoneNumber: new FormControl(''),
    relativesCellNumber: new FormControl('', Validators.required),
    relativesAddress: new FormControl('', Validators.required),
    relativesRt: new FormControl(''),
    relativesRw: new FormControl(''),
    relativesWard: new FormControl('', Validators.required),
    relativesDistrict: new FormControl('', Validators.required),
    relativesCity: new FormControl('', Validators.required),
    relativesProvince: new FormControl('', Validators.required),
  });
  forthFormGroup: FormGroup = new FormGroup({
    profileId: new FormControl(''),
    breadwinner: new FormControl('', Validators.required),
    literacyAbility: new FormControl('', Validators.required),
    transportationOwner: new FormControl('', Validators.required),
    insuranceOwner: new FormControl('', Validators.required),
    internetAccess: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private readonly customerService: CostumerSurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBanks();
    this.loadProvinces();
  }

  formOne(property: string): FormGroup {
    return this.firstFormGroup.get(property) as FormGroup;
  }

  // const prevButton = document.querySelectorAll(".btn-prev")
  // const nextButton = document.querySelectorAll(".btn-next")
  // const progress = document.getElementById("progress")
  // const formStep = document.querySelectorAll(".form-step")

  // let formStepNumber = 0

  // surveyForm: FormGroup = new FormGroup({
  //   surveyDataId: new FormControl(''),
  //   mothersMaidenName: new FormControl('', Validators.required),
  //   latestEducationalLevel: new FormControl('', Validators.required),
  //   dependents: new FormControl('', [Validators.required]),
  //   email: new FormControl('', Validators.required),
  //   bankName: new FormControl('', Validators.required),
  //   accountName: new FormControl('', Validators.required),
  //   accountNumber: new FormControl('', Validators.required),
  // })

  // addloan(loan: CustomerSurveyData){
  //   this.route.params.subscribe((parameter) => {
  //     if (parameter && parameter['id']){
  //       console.log('ID: ', parameter['id']);
  //       this.loanService.updateLoan(loan).subscribe({
  //         next: () => this.router.navigateByUrl('/loan-list'),
  //         error: (err) => alert ('Failed submit error!')
  //       })
  //     }else{
  //       this.loanService.addLoan(loan).subscribe((res) => {
  //         console.log('NEW DATA: ', res);
  //         this.router.navigateByUrl('/loan-list')
  //         })
  //     }
  //   })
  // }

  // getloanData(){
  //   this.route.params.subscribe((parameter) => {
  //     if (parameter && parameter['id']){
  //       console.log(parameter['id']);
  //       this.loanService.getLoanById(parameter['id']).subscribe((res: ApiResponse<LoanType>) => {
  //         console.log('Data loan', res);
  //         this.setFormGroup(res.data)
  //       })
  //     }
  //   })
  // }

  // form(property: string): FormGroup{
  //   return this.surveyForm.get(property) as FormGroup
  // }

  // setFormGroup(survey: CustomerSurveyData){
  //   this.surveyForm.controls['surveyDataId'].setValue(survey.surveyDataId)
  //   this.surveyForm.controls['mothersMaidenName'].setValue(survey.mothersMaidenName)
  //   this.surveyForm.controls['latestEducationalLevel'].setValue(survey.latestEducationalLevel)
  //   this.surveyForm.controls['dependents'].setValue(survey.dependents)
  //   this.surveyForm.controls['email'].setValue(survey.email)
  //   this.surveyForm.controls['bankName'].setValue(survey.bankName)
  //   this.surveyForm.controls['accountName'].setValue(survey.accountName)
  //   this.surveyForm.controls['accountName'].setValue(survey.accountName)
  // }

  // back(){
  //   this.router.navigateByUrl('/loan-list')
  // }

  submit(
    firstForm: CustomerSurveyData,
    secondForm: SpouseData,
    thirdForm: RelativesData,
    forthForm: ProfilingData
  ) {
    Swal.fire({
      title: 'Do you want to submit the survey?',
      showDenyButton: true,
      confirmButtonText: `Submit`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.postFirstSurvey(firstForm).subscribe((res) => {
          // console.log("DATA: ", res);
          this.customerService          
            .postSecondSurvey(secondForm)
            .subscribe((res2) => {
              this.customerService
                .postThirdSurvey(thirdForm)
                .subscribe((res3) => {
                  this.customerService
                    .postForthSurvey(forthForm)
                    .subscribe((res4) => {
                      this.router.navigateByUrl('customer-survey-details');
                    });
                });
            });
        });
        Swal.fire('Submited!', '', 'success');
      }
    });
  }

  dataBanks: Banks[] = [];
  loadBanks() {
    this.customerService.getBanks().subscribe({
      next: (res: Banks[]) => {
        this.dataBanks = res;
      },
    });
  }

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
    this.customerService.getCities(provId).subscribe({
      next: (res: City[]) => {
        this.dataCities = res;
      },
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

  // submit() {
  //   console.log(this.profilingForm.value.breadwinner);
  //   console.log(this.profilingForm.value.literacy_ability);
  //   console.log(this.profilingForm.value.transportation_owner);
  //   console.log(this.profilingForm.value.insurance_owner);
  //   console.log(this.profilingForm.value.internet_access);

  // }

  // setFormGroup(profiling: ProfilingCustomer){
  //   this.profilingForm.controls['id'].setValue(profiling.id)
  //   this.profilingForm.controls['breadwinner'].setValue(profiling.breadwinner)
  //   this.profilingForm.controls['literacy_ability'].setValue(profiling.literacy_ability)
  //   this.profilingForm.controls['transportation_owner'].setValue(profiling.transportation_owner)
  //   this.profilingForm.controls['insurance_owner'].setValue(profiling.insurance_owner)
  //   this.profilingForm.controls['internet_access'].setValue(profiling.internet_access)
  // }
}
