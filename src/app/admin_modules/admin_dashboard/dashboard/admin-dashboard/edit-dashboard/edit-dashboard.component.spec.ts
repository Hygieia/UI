import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDashboardComponent } from './edit-dashboard.component';
import { AdminOrderByPipe } from '../../../../../shared/pipes/order-by.pipe';
import { AdminFilterPipe } from '../../../../../shared/pipes/filter.pipe';
import { DashboardDataService } from '../../../../../shared/services/dashboard-data.service';
import { CmdbDataService } from '../../../../../shared/services/cmdb-data.service';
import { AdminDashboardService } from '../../../services/dashboard.service';
import { PaginationWrapperService } from '../../../services/pagination-wrapper.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { DashEditComponent } from '../../../../../shared/dash-edit/dash-edit.component';
import { DashTrashComponent } from '../../../../../shared/dash-trash/dash-trash.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DASHBOARDITEM } from '../../../../../shared/services/user-data.service.mockdata';
import { DashboardItem } from '../../../../../shared/model/dashboard-item';
import { UserDataService } from '../../../../../shared/services/user-data.service';
import { MockDashboardDataService } from '../../../services/mock-dashboard-data.service';
import { MockPaginationWrapperService } from '../../../services/mock-pagination-wrapper.service';
import { EditDashboardModalComponent } from '../../../../../shared/modals/edit-dashboard-modal/edit-dashboard-modal.component';
import {GeneralDeleteComponent} from '../../../../../shared/modals/general-delete/general-delete.component';

@NgModule({
  declarations: [EditDashboardComponent, AdminFilterPipe, AdminOrderByPipe,
    EditDashboardModalComponent, DashTrashComponent, DashEditComponent, GeneralDeleteComponent],
  providers: [{ provide: DashboardDataService, useClass: MockDashboardDataService },
    CmdbDataService, UserDataService, AdminDashboardService, { provide: PaginationWrapperService, useClass: MockPaginationWrapperService }],
  imports: [FormsModule, CommonModule, NgbModule, ReactiveFormsModule, HttpClientTestingModule, SharedModule, HttpClientModule],
  entryComponents: [
    EditDashboardModalComponent,
    GeneralDeleteComponent]
})
class TestModule { }

describe('EditDashboardComponent', () => {
  let component: EditDashboardComponent;
  let fixture: ComponentFixture<EditDashboardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should openConfig edit  when clicked', () => {
    component.editDashboard(DASHBOARDITEM as DashboardItem);
  });

  it('should openConfig delete  when clicked', () => {
    component.deleteDashboard(DASHBOARDITEM);
  });

  it('should getNextPage ', () => {
    component.getNextPage({page: 1 , pageSize: 10}, false);
  });

});


