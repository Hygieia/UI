import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { CollectorService } from 'src/app/shared/collector.service';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { DockerService } from '../docker.service';


@Component({
  selector: 'app-docker-config-form',
  templateUrl: './docker-config-form.component.html',
  styleUrls: ['./docker-config-form.component.sass']
})
export class DockerConfigFormComponent implements OnInit {

  private widgetConfigId: string;
  private componentId: string;
  private collectorId : string;
  private collectorItemId: string;
  dashboard: any;	 
  dockerConfigForm: FormGroup;

  @Input()
  set widgetConfig(widgetConfig: any) {
    this.widgetConfigId = widgetConfig.options.id;
    this.dockerConfigForm.get('instanceURL').setValue(widgetConfig.options.instanceURL);
    this.dockerConfigForm.get('instancePort').setValue(widgetConfig.options.instancePort);
    this.dockerConfigForm.get('apiToken').setValue(widgetConfig.options.apiToken);
    this.dockerConfigForm.get('description').setValue(widgetConfig.options.description);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private collectorService: CollectorService,
    private dashboardService: DashboardService,
    private dockerService: DockerService) {
    this.createForm();
  	}

  ngOnInit() {
    this.loadSavedDockerJob();
  }

  ngAfterViewInit() {
	this.getDashboardComponent();
  }

  private createForm() {
    this.dockerConfigForm = this.formBuilder.group({
      instanceURL: ['', Validators.required],
      instancePort: ['', Validators.required],
      apiToken: [''],
	  description: [''],
    });
  }

  private submitForm() {
	
    const newConfig = {
      name: 'Docker',
      options: {
        id: this.widgetConfigId,
        instanceURL: this.dockerConfigForm.value.instanceURL,
        instancePort: this.dockerConfigForm.value.instancePort,
        apiToken: this.dockerConfigForm.value.apiToken,
      },
      componentId: this.componentId,
      collectorItemId: this.collectorItemId
    };

    this.activeModal.close(newConfig);
  }

  private loadSavedDockerJob() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
        const dockerCollector = dashboard.application.components[0].collectorItems.Docker;
        if (dockerCollector) {
          const dockerId = dockerCollector[0].id;
          return dockerId;
        }
        return null;
      }),
      switchMap(dockerId => {
        if (dockerId) {
          return this.collectorService.getItemsById(dockerId);
        }
        return of(null);
      })).subscribe(collectorData => {
        this.collectorItemId = collectorData.id;
      });
  }

  private getDashboardComponent() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
	    this.dashboard = dashboard;
        return dashboard.application.components[0].id;
      })).subscribe(componentId => this.componentId = componentId);
  }

}
