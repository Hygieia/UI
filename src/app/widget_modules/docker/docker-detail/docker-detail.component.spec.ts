import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerDetailComponent } from './docker-detail.component';

describe('DockerDetailComponent', () => {
  let component: DockerDetailComponent;
  let fixture: ComponentFixture<DockerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
