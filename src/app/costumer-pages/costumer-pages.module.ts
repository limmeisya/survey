import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumerPagesRoutingModule } from './costumer-pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CostumerPagesComponent } from './costumer-pages.component';
import { SharedModule } from '../shared/shared.module';
import { CostumerApprovalComponent } from './costumer-approval/costumer-approval.component';
import { CostumerProspectComponent } from './costumer-prospect/costumer-prospect.component';
import { CostumerCreditSubmissionComponent } from './costumer-credit-submission/costumer-credit-submission.component';
import { CostumerDisbursementComponent } from './costumer-disbursement/costumer-disbursement.component';
import { SurveyReviewComponent } from './costumer-survey/survey-review/survey-review.component';
import { SurveyFormComponent } from './costumer-survey/survey-form/survey-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CostumerPagesComponent,
    HomeComponent,
    CostumerApprovalComponent,
    CostumerProspectComponent,
    CostumerCreditSubmissionComponent,
    CostumerDisbursementComponent,
    SurveyReviewComponent,
    SurveyFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostumerPagesRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class CostumerPagesModule { }
