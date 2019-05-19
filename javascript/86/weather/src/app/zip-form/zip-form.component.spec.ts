import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipFormComponent } from './zip-form.component';

describe('ZipFormComponent', () => {
  let component: ZipFormComponent;
  let fixture: ComponentFixture<ZipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
