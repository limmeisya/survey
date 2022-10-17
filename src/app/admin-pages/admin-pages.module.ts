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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


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
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule
  ]
})

export class AdminPagesModule { }
