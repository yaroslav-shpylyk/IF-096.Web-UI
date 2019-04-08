import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyGroupComponent } from './add-modify.component';

describe('AddModifyComponent', () => {
  let component: AddModifyGroupComponent;
  let fixture: ComponentFixture<AddModifyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModifyGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
