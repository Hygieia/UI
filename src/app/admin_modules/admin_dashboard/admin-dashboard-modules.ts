import { NgModule } from '@angular/core';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { GenerateApiTokensComponent } from './dashboard/admin-dashboard/generate-api-tokens/generate-api-tokens.component';
import { FormsModule } from '@angular/forms';
import { UserDataService } from './services/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminFilterPipe } from './pipes/filter.pipe';
import { AdminOrderByPipe } from './pipes/order-by.pipe';
import { DashEditComponent } from './dashboard/admin-dashboard/dash-edit/dash-edit.component';
import { ManageAdminsComponent } from './dashboard/admin-dashboard/manage-admins/manage-admins.component';
import { EditTokenModalComponent } from './dashboard/admin-dashboard/modal/edit-token-modal/edit-token-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { GenerateApiTokenModalComponent } from './dashboard/admin-dashboard/modal/generate-api-token-modal/generate-api-token-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashTrashComponent } from './dashboard/admin-dashboard/dash-trash/dash-trash.component';
// tslint:disable-next-line:max-line-length
import {CreateOrUpdateFeatureFlagsComponent} from './dashboard/admin-dashboard/modal/create-or-update-feature-flags/create-or-update-feature-flags.component';
import {UpdateJsonComponent} from './dashboard/admin-dashboard/modal/update-json/update-json.component';
import {ViewJsonComponent} from './dashboard/admin-dashboard/modal/view-json/view-json.component';
import {FeatureFlagsComponent} from './dashboard/admin-dashboard/feature-flags/feature-flags.component';
import {SharedModule} from '../../shared/shared.module';
import {ServiceAccountsComponent} from './dashboard/admin-dashboard/service-accounts/service-accounts.component';
// tslint:disable-next-line:max-line-length
import {CreateOrUpdateServiceAccountComponent} from './dashboard/admin-dashboard/modal/create-or-update-service-account/create-or-update-service-account.component';
import { DashboardDataService } from './services/dashboard-data.service';
import { PaginationWrapperService } from './services/pagination-wrapper.service';
import { AdminDashboardService } from './services/dashboard.service';
import { EditDashboardModalComponent } from './dashboard/admin-dashboard/modal/edit-dashboard-modal/edit-dashboard-modal.component';
import { EditDashboardComponent } from './dashboard/admin-dashboard/edit-dashboard/edit-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    GenerateApiTokensComponent,
    AdminFilterPipe,
    AdminOrderByPipe,
    CreateOrUpdateFeatureFlagsComponent,
    CreateOrUpdateServiceAccountComponent,
    DashEditComponent,
    ManageAdminsComponent,
    EditTokenModalComponent,
    GenerateApiTokenModalComponent,
    DashTrashComponent,
    FeatureFlagsComponent,
    ServiceAccountsComponent,
    UpdateJsonComponent,
    ViewJsonComponent,
    EditDashboardComponent,
    EditDashboardModalComponent,

  ],

  providers: [UserDataService, DashboardDataService, PaginationWrapperService, AdminDashboardService],

  imports: [
    AdminDashboardRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateOrUpdateFeatureFlagsComponent,
    CreateOrUpdateServiceAccountComponent,
    EditTokenModalComponent,
    GenerateApiTokenModalComponent,
    UpdateJsonComponent,
    ViewJsonComponent,
    EditDashboardModalComponent

  ]
})

export class AdminDashboardModule { }
