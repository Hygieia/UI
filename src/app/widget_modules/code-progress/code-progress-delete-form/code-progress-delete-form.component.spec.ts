import {HttpClientTestingModule} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeProgressDeleteFormComponent } from './code-progress-delete-form.component';
import {Observable, of} from 'rxjs';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {DashboardService} from '../../../shared/dashboard.service';
import {CollectorService} from '../../../shared/collector.service';
import {CodeProgressModule} from '../code-progress.module';

class MockCollectorService {
  mockCollectorData = {
    id: '4321',
    description: 'Deploy : job1',
    collectorId: '1234',
    collector: {
      id: '1234',
      name: 'Deploy',
      collectorType: 'Deployment'
    }
  };

  getItemsById(id: string): Observable<any> {
    return of(this.mockCollectorData);
  }
}

class MockDashboardService {
  mockDashboard = {
    title: 'dashboard1',
    application: {
      components: [{
        collectorItems: {
          Deployment: [{
            id: '1234',
            description: 'Deploy : job1'
          }]
        }
      }]
    }
  };
  dashboardConfig$ = of(this.mockDashboard);
}

@NgModule({
  declarations: [],
  imports: [CodeProgressModule, HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule,
    RouterModule.forRoot([]), NgbModule],
  entryComponents: []
})
class TestModule { }

describe('DeployDeleteFormComponent', () => {
  let component: CodeProgressDeleteFormComponent;
  let fixture: ComponentFixture<CodeProgressDeleteFormComponent>;
  let dashboardService: DashboardService;
  let collectorService: CollectorService;
  let modalService: NgbModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, HttpClientTestingModule, ReactiveFormsModule, NgbModule],
      declarations: [],
      providers: [
        { provide: NgbActiveModal, useClass: NgbActiveModal },
        { provide: CollectorService, useClass: MockCollectorService},
        { provide: DashboardService, useClass: MockDashboardService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeProgressDeleteFormComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
    collectorService = TestBed.get(CollectorService);
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass through getDashboardComponent and getSavedDeployJob', () => {
    component.ngOnInit();
  });

  it('should set widgetConfig', () => {
    let widgetConfigData = {
      options: {
        id: 1232,
        deployRegex: [''],
        deployAggregateServer: true,
      }
    };
    component.widgetConfig = widgetConfigData;

    const widgetConfigDataNoAggregate = {
      options: {
        id: 1232,
        deployRegex: [''],
        deployAggregateServer: false,
      }
    };
    component.widgetConfig = widgetConfigDataNoAggregate;

    widgetConfigData = null;
    component.widgetConfig = widgetConfigData;
  });

  it('should assign selected job after submit', () => {
    component.createDeleteForm();
    expect(component.deployDeleteForm.get('deployJob').value).toEqual('');
    component.deployDeleteForm = component.formBuilder.group({deployJob: 'deployJob1'});
    component.submitDeleteForm();
    expect(component.deployDeleteForm.get('deployJob').value).toEqual('deployJob1');
  });

  it('should load saved deploy job', () => {
    component.getSavedDeployJob();
    collectorService.getItemsById('4321').subscribe(result => {
      expect(component.deployDeleteForm.get('deployJob').value).toEqual(result);
    });
  });
});
