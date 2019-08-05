import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTypesComponent } from './mark-types.component';

describe('MarkTypesComponent', () => {
  let component: MarkTypesComponent;
  let fixture: ComponentFixture<MarkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
