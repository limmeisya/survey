import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guard/admin.guard';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminCreditSubmissionComponent } from './admin-credit-submission/admin-credit-submission.component';
import { AdminDisbursementComponent } from './admin-disbursement/admin-disbursement.component';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminProspectComponent } from './admin-prospect/admin-prospect.component';
import { NewSurveyComponent } from './admin-survey/new-survey/new-survey.component';
import { SurveyListComponent } from './admin-survey/survey-list/survey-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path : '',
    component : AdminPagesComponent,
    canActivate : [AuthGuard, AdminGuard],
    canActivateChild : [AuthGuard, AdminGuard],
    children : [
      {
        path : 'dashboard',
        component : DashboardComponent
      },
      {
        path : 'admin-approval',
        component : AdminApprovalComponent
      },
      {
        path : 'admin-credit-submission',
        component : AdminCreditSubmissionComponent
      },
      {
        path : 'admin-disbursement',
        component : AdminDisbursementComponent
      },
            {
        path : 'admin-prospect',
        component : AdminProspectComponent
      },
      {
        path : 'admin-new-survey',
        component : NewSurveyComponent
      },
      {
        path : 'admin-survey-list',
        component : SurveyListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
