import { NgModule } from '@angular/core';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { GenerateApiTokensComponent } from './dashboard/admin-dashboard/generate-api-tokens/generate-api-tokens.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManageAdminsComponent } from './dashboard/admin-dashboard/manage-admins/manage-admins.component';
import { EditTokenModalComponent } from './dashboard/admin-dashboard/modal/edit-token-modal/edit-token-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { GenerateApiTokenModalComponent } from './dashboard/admin-dashboard/modal/generate-api-token-modal/generate-api-token-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {CreateOrUpdateFeatureFlagsComponent} from './dashboard/admin-dashboard/modal/create-or-update-feature-flags/create-or-update-feature-flags.component';
import {FeatureFlagsComponent} from './dashboard/admin-dashboard/feature-flags/feature-flags.component';
import {SharedModule} from '../../shared/shared.module';
import {ServiceAccountsComponent} from './dashboard/admin-dashboard/service-accounts/service-accounts.component';
// tslint:disable-next-line:max-line-length
import {CreateOrUpdateServiceAccountComponent} from './dashboard/admin-dashboard/modal/create-or-update-service-account/create-or-update-service-account.component';
import { DashboardDataService } from '../../shared/services/dashboard-data.service';
import { PaginationWrapperService } from './services/pagination-wrapper.service';
import { AdminDashboardService } from './services/dashboard.service';
import { EditDashboardComponent } from './dashboard/admin-dashboard/edit-dashboard/edit-dashboard.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    GenerateApiTokensComponent,
    CreateOrUpdateFeatureFlagsComponent,
    CreateOrUpdateServiceAccountComponent,
    ManageAdminsComponent,
    EditTokenModalComponent,
    GenerateApiTokenModalComponent,
    FeatureFlagsComponent,
    ServiceAccountsComponent,
    EditDashboardComponent
  ],

  providers: [PaginationWrapperService, AdminDashboardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],

  imports: [
    AdminDashboardRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CreateOrUpdateFeatureFlagsComponent,
    CreateOrUpdateServiceAccountComponent,
    EditTokenModalComponent,
    GenerateApiTokenModalComponent
  ]
})

export class AdminDashboardModule { }
