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
        path : 'customer-survey-form',
        component : SurveyFormComponent
      },
      {
        path : 'customer-survey-details',
        component : SurveyReviewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumerPagesRoutingModule { }
