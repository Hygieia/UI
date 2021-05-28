import {Component, Input, OnInit, Type} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IClickListDockerVolumeItem } from '../docker-detail/IClickListDockerItem';
@Component({
  selector: 'app-docker-detail',
  templateUrl: './docker-detail.component.html',
  styleUrls: ['./docker-detail.component.sass']
})
export class DockerDetailComponent implements OnInit {

  @Input() detailView: Type<any>;

  public data: Type<any>;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  @Input()
  set detailData(data: any) {
    this.data = data;
  }
}
