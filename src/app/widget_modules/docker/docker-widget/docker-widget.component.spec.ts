import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerWidgetComponent } from './docker-widget.component';

describe('DockerWidgetComponent', () => {
  let component: DockerWidgetComponent;
  let fixture: ComponentFixture<DockerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
