import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumerPagesRoutingModule } from './costumer-pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CostumerPagesComponent } from './costumer-pages.component';
import { SharedModule } from '../shared/shared.module';
import { CostumerApprovalComponent } from './costumer-approval/costumer-approval.component';
import { CostumerProspectComponent } from './costumer-prospect/costumer-prospect.component';
import { CostumerCreditSubmissionComponent } from './costumer-credit-submission/costumer-credit-submission.component';
import { CostumerSurveyComponent } from './costumer-survey/costumer-survey.component';
import { CostumerDisbursementComponent } from './costumer-disbursement/costumer-disbursement.component';


@NgModule({
  declarations: [
    CostumerPagesComponent,
    HomeComponent,
    CostumerApprovalComponent,
    CostumerProspectComponent,
    CostumerCreditSubmissionComponent,
    CostumerSurveyComponent,
    CostumerDisbursementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostumerPagesRoutingModule
  ]
})
export class CostumerPagesModule { }
