import {Component, Input, OnInit, Type} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-code-progress',
  templateUrl: './code-progress.component.html',
  styleUrls: ['./code-progress.component.scss']
})
export class CodeProgressComponent implements OnInit {
  rows = [
    { name: 'version1.1', gender: 'version2', company: 'version3' },
    { name: 'version1', gender: 'version3', company: 'version4' },
    { name: 'version2', gender: 'version4', company: 'version5' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
  @Input() detailView: Type<any>;

  public data: any[];

  constructor(
    public activeModal: NgbActiveModal,
  ) {
    var rows2 = [
      { name: 'version1', gender: 'version2', company: 'version3' },
      { name: 'version1', gender: 'version3', company: 'version4' },
      { name: 'version2', gender: 'version4', company: 'version5' },
    ];
    var columns2 = [
      { prop: 'name' },
      { name: 'Gender' },
      { name: 'Company' }
    ];
    this.data = [{rows: rows2, columns: columns2}]
  }

  ngOnInit() {
  }

  @Input()
  set detailData(data: any) {
    var rows2 = [
      { name: 'version1', gender: 'version2', company: 'version3' },
      { name: 'version1', gender: 'version3', company: 'version4' },
      { name: 'version2', gender: 'version4', company: 'version5' },
    ];
    var columns2 = [
      { prop: 'name' },
      { name: 'Gender' },
      { name: 'Company' }
    ];
    if (data.data) {
      this.data = data.data;
    } else {
      this.data = [data];
    }
    this.data = [{rows: rows2, columns: columns2}]
  }
}
