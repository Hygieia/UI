import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { DockerWidgetComponent} from './docker-widget/docker-widget.component';
import { DockerDetailComponent} from './docker-detail/docker-detail.component';
import { DockerConfigFormComponent} from './docker-config-form/docker-config-form.component';
@NgModule({
 declarations: [DockerWidgetComponent, DockerConfigFormComponent, DockerDetailComponent],
  entryComponents: [DockerConfigFormComponent, DockerDetailComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule
  ]
})
export class DockerModule { }