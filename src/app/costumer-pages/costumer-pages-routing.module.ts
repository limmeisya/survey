import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProspectComponent } from '../admin-pages/admin-prospect/admin-prospect.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CustomerGuard } from '../shared/guard/customer.guard';
import { CostumerApprovalComponent } from './costumer-approval/costumer-approval.component';
import { CostumerCreditSubmissionComponent } from './costumer-credit-submission/costumer-credit-submission.component';
import { CostumerDisbursementComponent } from './costumer-disbursement/costumer-disbursement.component';
import {CostumerPagesComponent} from './costumer-pages.component'
import { CostumerProspectComponent } from './costumer-prospect/costumer-prospect.component';
import { SurveyFormComponent } from './costumer-survey/survey-form/survey-form.component';
import { SurveyListComponent } from './costumer-survey/survey-list/survey-list.component';
import { SurveyReviewComponent } from './costumer-survey/survey-review/survey-review.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : '',
    component : CostumerPagesComponent,
    canActivate : [AuthGuard, CustomerGuard],
    canActivateChild : [AuthGuard, CustomerGuard],
    children : [
      {
        path : 'home',
        component : HomeComponent
      },
      {
        path : 'approval',
        component : CostumerApprovalComponent
      },
      {
        path : 'credit-submission',
        component : CostumerCreditSubmissionComponent
      },
      {
        path : 'disbursement',
        component : CostumerDisbursementComponent
      },
            {
        path : 'prospect',
        component : CostumerProspectComponent
      },
      {
        path : 'cust-survey-form/:id',
        component : SurveyFormComponent
      },
      {
        path : 'cust-survey-form/:id/:id2',
        component : SurveyFormComponent
      },
      {
        path : 'cust-survey-details/:id/:id2',
        component : SurveyReviewComponent
      },
      {
        path : 'cust-survey-list/:id',
        component : SurveyListComponent
      },
      {
        path : 'cust-survey-list/:id',
        component : SurveyListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumerPagesRoutingModule { }
