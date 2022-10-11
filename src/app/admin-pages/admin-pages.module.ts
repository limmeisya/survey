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
import { NewSurveyComponent } from './admin-survey/new-survey/new-survey.component';
import { SurveyListComponent } from './admin-survey/survey-list/survey-list.component';


@NgModule({
  declarations: [
    AdminPagesComponent,
    DashboardComponent,
    AdminApprovalComponent,
    AdminCreditSubmissionComponent,
    AdminDisbursementComponent,
    AdminProspectComponent,
    NewSurveyComponent,
    SurveyListComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
  ]
})

export class AdminPagesModule { }
