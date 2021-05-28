import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerConfigFormComponent } from './docker-config-form.component';

describe('DockerConfigFormComponent', () => {
  let component: DockerConfigFormComponent;
  let fixture: ComponentFixture<DockerConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
