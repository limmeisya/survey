import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { AdminPagesComponent } from './admin-pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminCreditSubmissionComponent } from './admin-credit-submission/admin-credit-submission.component';
import { AdminDisbursementComponent } from './admin-disbursement/admin-disbursement.component';
import { AdminProspectComponent } from './admin-prospect/admin-prospect.component';
import { AdmSurveyFormComponent } from './admin-survey/adm-survey-form/adm-survey-form.component';
import { AdmSurveyListComponent } from './admin-survey/adm-survey-list/adm-survey-list.component';
import { AdmSurveyReviewComponent } from './admin-survey/adm-survey-review/adm-survey-review.component';


@NgModule({
  declarations: [
    AdminPagesComponent,
    DashboardComponent,
    AdminApprovalComponent,
    AdminCreditSubmissionComponent,
    AdminDisbursementComponent,
    AdminProspectComponent,
    AdmSurveyFormComponent,
    AdmSurveyListComponent,
    AdmSurveyReviewComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
  ]
})

export class AdminPagesModule { }
