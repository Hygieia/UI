import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { SharedModule } from 'src/app/shared/shared.module';
import {RepoWidgetComponent} from './repo-widget.component';
import {RepoService} from '../repo.service';
import {Observable, of} from 'rxjs';
import {IRepo} from '../interfaces';

class MockRepoService {
  mockRepoData = {
    result: [
      {
        id: 'testId',
        collectorItemId: 'testId',
        scmRevisionNumber: 'testRev',
        scmAuthor: 'testAuthor',
        scmCommitLog: 'testCommit',
        scmCommitTimestamp: 'testTime',
        timestamp: 'testTime',
        number: 'testNum',
        mergeAuthor: 'testAuthor',
        mergedAt: 'testMerge'
      }
    ]
  };

  fetchDetails(): Observable<IRepo[]> {
    return of(this.mockRepoData.result);
  }
}

@NgModule({
  declarations: [],
  imports: [HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule, RouterModule.forRoot([]), NgbModule],
  entryComponents: []
})
class TestModule { }

describe('RepoWidgetComponent', () => {
  let component: RepoWidgetComponent;
  let repoService: RepoService;
  let dashboardService: DashboardService;
  let modalService: NgbModal;
  let fixture: ComponentFixture<RepoWidgetComponent>;

  const IRepo1 = {
    id: 'testId',
    collectorItemId: 'testId',
    scmRevisionNumber: 'testRev',
    scmAuthor: 'testAuthor',
    scmCommitLog: 'testCommit',
    scmCommitTimestamp: 'testTime',
    timestamp: 'testTime',
    number: 'testNum',
    mergeAuthor: 'testAuthor',
    mergedAt: 'testMerge'
  } as IRepo;

  const IRepo2 = {
    id: 'testId',
    collectorItemId: 'testId',
    scmRevisionNumber: 'testRev',
    scmAuthor: 'testAuthor',
    scmCommitLog: 'testCommit',
    scmCommitTimestamp: 'testTime',
    timestamp: 'testTime',
    number: 'testNum',
    mergeAuthor: 'testAuthor',
    mergedAt: 'testMerge'
  } as IRepo;

  const IRepo3 = {
    id: 'testId',
    collectorItemId: 'testId',
    scmRevisionNumber: 'testRev',
    scmAuthor: 'testAuthor',
    scmCommitLog: 'testCommit',
    scmCommitTimestamp: 'testTime',
    timestamp: 'testTime',
    number: 'testNum',
    mergeAuthor: 'testAuthor',
    mergedAt: 'testMerge'
  } as IRepo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RepoService, useClass: MockRepoService }
      ],
      imports: [
        TestModule, HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule, RouterModule.forRoot([])
      ],
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RepoWidgetComponent);
    component = fixture.componentInstance;
    repoService = TestBed.get(RepoService);
    dashboardService = TestBed.get(DashboardService);
    modalService = TestBed.get(NgbModal);
  }));

  it('should hit generateRepoPerDay', () => {
    component.generateRepoPerDay([IRepo1], [IRepo2], [IRepo3]);
  });

  it('should hit generateTotalRepoCounts', () => {
    component.generateTotalRepoCounts([IRepo1], [IRepo2], [IRepo3]);
  });

  it('should hit countRepoPerDay if statements', () => {
    const date = new Date(123);
    component.countRepoPerDay([IRepo1], date, 'commit');
    component.countRepoPerDay([IRepo1], date, 'pull');
    component.countRepoPerDay([IRepo1], date, 'issue');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(repoService).toBeTruthy();
    expect(dashboardService).toBeTruthy();
    expect(modalService).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
