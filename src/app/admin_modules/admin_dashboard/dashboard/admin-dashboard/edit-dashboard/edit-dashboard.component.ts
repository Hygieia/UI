import { Component, OnInit, Input } from '@angular/core';
import { PaginationWrapperService } from '../../../services/pagination-wrapper.service';
import { DashboardDataService } from '../../../services/dashboard-data.service';
import { IPaginationParams } from 'src/app/shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardItem } from '../model/dashboard-item';
import { DeleteConfirmModalComponent } from '../../../../../shared/modals/delete-confirm-modal/delete-confirm-modal.component';
import { EditDashboardModalComponent } from '../modal/edit-dashboard-modal /edit-dashboard-modal.component';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {
  totalItems: any;
  dashboardType: any;
  dashboards: any = [];
  page: PaginationWrapperService;
  @Input() dashboardItem: any;
  pageSize = 10;
  searchDashboard = '';

  constructor(private dashboardData: DashboardDataService, private paginationWrapperService: PaginationWrapperService,
              private modalService: NgbModal) {
    this.page = paginationWrapperService;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dashboardData.getPageSize().subscribe((data) => {
      this.pullDashboards(undefined);
    });
  }

  pullDashboards(type) {
    this.dashboardData.searchByPage({ search: '', type, size: this.getPageSize(), page: 0 })
      .subscribe(this.processDashboardResponse, this.processDashboardError);
    this.paginationWrapperService.calculateTotalItems(type)
      .subscribe(() => {
        this.totalItems = this.paginationWrapperService.getTotalItems();
      });

  }

  processDashboardResponse = (data) => {
    this.dashboards = this.page.processDashboardResponse(data);
  }

  processDashboardError(data) {
    this.dashboards = this.paginationWrapperService.processDashboardError(data);
  }

  getPageSize() {
    return this.paginationWrapperService.getPageSize();
  }

  editDashboard(item: DashboardItem) {
    const modalRef = this.modalService.open(EditDashboardModalComponent);
    modalRef.componentInstance.dashboardItem = item;
    modalRef.result.then((newConfig) => {
      this.loadData();
    });

  }

  pageChangeHandler(pageNumber) {
    this.paginationWrapperService.pageChangeHandler(pageNumber, this.dashboardType)
      .subscribe((response: any) => {
        this.dashboards = this.paginationWrapperService.getDashboards();
      });
  }


  getNextPage(params: IPaginationParams, isMyDashboard: boolean) {
    this.pageChangeHandler(params.page);
  }

  deleteDashboard(item) {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure you want to delete ${item.name}?`;
    modalRef.result.then((newConfig) => {
      this.dashboardData.deleteDashboard(item.id).subscribe(response => {
        this.loadData();
      });
    }).catch((error) => {
      console.log('delete error newConfig :' + error);
    });
  }

}
