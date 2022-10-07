import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guard/admin.guard';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminCreditSubmissionComponent } from './admin-credit-submission/admin-credit-submission.component';
import { AdminDisbursementComponent } from './admin-disbursement/admin-disbursement.component';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminProspectComponent } from './admin-prospect/admin-prospect.component';
import { AdminSurveyComponent } from './admin-survey/admin-survey.component';
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
        path : 'admin-survey',
        component : AdminSurveyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
