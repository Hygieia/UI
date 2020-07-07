import { HttpParams } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IPaginationParams } from '../../shared/interfaces';
import { IDashboards } from './dashboard-list';
import { DashboardListService } from './dashboard-list.service';
import {NbDialogService} from '@nebular/theme';
import {DashboardCreateComponent} from '../dashboard-create/dashboard-create.component';
import {EditDashboardModalComponent} from '../../shared/modals/edit-dashboard-modal/edit-dashboard-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DashboardDataService} from '../../admin_modules/admin_dashboard/services/dashboard-data.service';
import {DeleteConfirmModalComponent} from '../../shared/modals/delete-confirm-modal/delete-confirm-modal.component';
import {GeneralDeleteComponent} from '../../shared/modals/general-delete/general-delete.component';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

  constructor(private landingPageService: DashboardListService, private router: Router,
              private dialogService: NbDialogService, private modalService: NgbModal, private dashboardData: DashboardDataService) { }
  dashboardType = '';
  queryField: FormControl = new FormControl();
  myDashboards: IDashboards[] = [];
  allDashboards: IDashboards[] = [];
  dashboardCollectionSize: string;
  myDashboardCollectionSize: string;
  defaultPageSize = '10';

  ngOnInit() {
    this.findMyDashboards(this.paramBuilder(0, this.defaultPageSize));
    this.findAllDashboards(this.paramBuilder(0, this.defaultPageSize));
    // Query for pull filtered owner dashboards
    this.queryField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => {
        return this.landingPageService.getMyDashboards(this.paramBuilder(0, this.defaultPageSize) ); })
    ).subscribe(response => {
      this.myDashboards = response.data;
      this.myDashboardCollectionSize = response.total;
    });
    // Query for pull filtered 'All' dashboards
    this.queryField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => {
        return this.landingPageService.getAllDashboards( this.paramBuilder(0, this.defaultPageSize) ); })
    )
      .subscribe(response => {
        this.allDashboards = response.data;
        this.dashboardCollectionSize = response.total;
      });
  }

  // Default function call for pulling users dashboards
  findMyDashboards(params: HttpParams): void {
    this.landingPageService.getMyDashboards(params).subscribe(
      response => {
        this.myDashboards = response.data;
        this.myDashboardCollectionSize = response.total;
      },
      error => console.log(error)
    );
  }
  findAllDashboards(params: HttpParams): void {
    this.landingPageService.getAllDashboards(params).subscribe(
      response => {
        this.allDashboards = response.data;
        this.dashboardCollectionSize = response.total;
      },
      error => console.log(error)
    );
  }
  getNextPage(params: IPaginationParams, isMyDashboard: boolean) {
    if ( isMyDashboard ) {
      this.findMyDashboards( this.paramBuilder(params.page - 1, params.pageSize) );
    } else {
      this.findAllDashboards( this.paramBuilder(params.page - 1, params.pageSize) );
    }
  }

  navigateToTeamDashboard(id: string) {
    this.router.navigate(['/dashboard/dashboardView']);
  }

  setDashboardType(type: string) {
    this.dashboardType = type;
    this.findMyDashboards(this.paramBuilder( 0, this.defaultPageSize));
    this.findAllDashboards(this.paramBuilder( 0, this.defaultPageSize));
  }

  paramBuilder(page: number, pageSize: string): HttpParams {
    const query = (this.queryField.value) ? this.queryField.value : '';
    return new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize)
      .set('search', query)
      .set('type', this.dashboardType);
  }

  goToAuditReport() {
    window.open('/audits', '_blank');
  }

  dashboardName(dashboard: IDashboards): string {
    const dName = [dashboard.title, dashboard.configurationItemBusAppName, dashboard.configurationItemBusServName]
      .filter(Boolean).join(' - ');
    return dName;
  }

  tabChange($event) {
    this.setDashboardType($event.tabId);
  }

  deleteDashboard(dashboard) {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure you want to delete ${dashboard}?`;
    modalRef.result.then((newConfig) => {
      this.dashboardData.deleteDashboard(dashboard.id).subscribe(response => {
      });
    }).catch((error) => {
      console.log('delete error newConfig :' + error);
    });
  }

  editDashboard(item) {
    console.log(item);
    const modalRef = this.modalService.open(GeneralDeleteComponent);
    modalRef.componentInstance.title = `Are you sure you want to delete ${item.name}?`;
    modalRef.componentInstance.dashboardItem = item;
    modalRef.result.then((newConfig) => {
    }).catch((error) => {
      console.log('edit error newConfig :' + error);
    });
  }

  createDashboard() {
    this.dialogService.open(DashboardCreateComponent);
  }
}
