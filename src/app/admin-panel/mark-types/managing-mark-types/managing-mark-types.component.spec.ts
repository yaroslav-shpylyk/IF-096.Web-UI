import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingMarkTypesComponent } from './managing-mark-types.component';

describe('ManagingMarkTypesComponent', () => {
  let component: ManagingMarkTypesComponent;
  let fixture: ComponentFixture<ManagingMarkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingMarkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingMarkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
