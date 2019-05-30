import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarMessComponent } from './snackbar-mess.component';

describe('SnackbarMessComponent', () => {
  let component: SnackbarMessComponent;
  let fixture: ComponentFixture<SnackbarMessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarMessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
