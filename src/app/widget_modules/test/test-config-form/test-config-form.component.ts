import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { take, map, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CollectorService } from 'src/app/shared/collector.service';
import { TestType } from '../interfaces';

@Component({
  selector: 'app-test-config-form',
  templateUrl: './test-config-form.component.html',
  styleUrls: ['./test-config-form.component.scss']
})
export class TestConfigFormComponent implements OnInit {

  private widgetConfigId: string;
  private componentId: string;
  readonly COLLECTOR_ITEM_TYPE = "Test";

  testConfigForm: FormGroup;
  searching =false;
  searchFailed = false;
  typeAheadResults: (text$: Observable<string>) => Observable<any>;

  // Format test result title
  getTestResultTitle (collectorItem: any) {
    return collectorItem ? collectorItem.niceName + " : " + collectorItem.description : "";
  }

  @Input()
  set widgetConfig(widgetConfig: any) {
    if(!widgetConfig) { return ; }
    this.widgetConfigId = widgetConfig.options.id;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private collectorService: CollectorService,
    private dashboardService: DashboardService
  ) {
    this.createForm();
    console.log(this.functionalTests.controls.length);
  }

  ngOnInit() {

    this.loadSavedTestResults();
    this.getDashboardComponent();

    this.typeAheadResults = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap(term => {
          return term.length < 1 ? of([]) :
            this.collectorService.searchItems(this.COLLECTOR_ITEM_TYPE, term).pipe(
              tap(() => this.searchFailed = false),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              })
            )
        }),
        tap(() => this.searching = false),
      );
  }

  private getDashboardComponent() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
        return dashboard.application.components[0].id;
      })).subscribe(componentId => this.componentId = componentId);
  }

  // Create forms for each test collector item and load them into respective form arrays
  private loadSavedTestResults() {
    this.dashboardService.dashboardConfig$.pipe(take(1)).subscribe(dashboard => {
      let testCollectorItems = dashboard.application.components[0].collectorItems.Test;
      let functionalTestCount:number = 0;
      let performanceTestCount:number = 0;
      for(let testCollectorItem of testCollectorItems) {
        if(testCollectorItem.options.testType == TestType.Functional.toString()) {
          this.addFunctionalTest();
          this.functionalTests.controls[functionalTestCount].get("test").setValue(testCollectorItem);
          functionalTestCount++;
        }else if(testCollectorItem.options.testType == TestType.Performance.toString()) {
          this.addPerformanceTest();
          this.performanceTests.controls[performanceTestCount].get("test").setValue(testCollectorItem);
          performanceTestCount++;
        }
      }
    });
  }

  private createForm() {
    this.testConfigForm = this.formBuilder.group({
      functionalTests: this.formBuilder.array([]),
      performanceTests: this.formBuilder.array([]),
    })
  }

  get functionalTests(): FormArray{
    return this.testConfigForm.get('functionalTests') as FormArray;
  }
  get performanceTests(): FormArray {
    return this.testConfigForm.get('performanceTests') as FormArray;
  }

  addFunctionalTest() {
    const test = this.formBuilder.group({
      test: new FormControl(""),
    });
    this.functionalTests.push(test);
  }

  addPerformanceTest() {
    const test = this.formBuilder.group({
      test: new FormControl(""),
    });
    this.performanceTests.push(test);
  }

  deleteFunctionalTest(i) {
    this.functionalTests.removeAt(i);
  }

  deletePerformanceTest(i) {
    this.performanceTests.removeAt(i);
  }


  // Create new config which will be posted to database
  private submitForm() {
    let newConfig = {
      name: "test",
      options: {
        id: this.widgetConfigId
      },
      componentId: this.componentId,
      collectorItemIds :[]
    }
    for(let control of this.functionalTests.controls) {
      if(control.value.test.id != undefined ) {
        newConfig.collectorItemIds.push(control.value.test.id);
      }
    }
    for(let control of this.performanceTests.controls) {
      if(control.value.test.id != undefined ) {
        newConfig.collectorItemIds.push(control.value.test.id);
      }
    }
    this.activeModal.close(newConfig);
  }

}