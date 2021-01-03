import {Component, Input, OnInit, Type} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-code-progress',
  templateUrl: './code-progress.component.html',
  styleUrls: ['./code-progress.component.scss']
})
export class CodeProgressComponent implements OnInit {

  @Input() detailView: Type<any>;

  public data: any[];

  constructor(
    public activeModal: NgbActiveModal,
  ) {

  }

  ngOnInit() {
  }

  @Input()
  set detailData(data: any) {

    if (data.data) {
      this.data = data.data;
    } else {
      this.data = [data];
    }
  }
}
