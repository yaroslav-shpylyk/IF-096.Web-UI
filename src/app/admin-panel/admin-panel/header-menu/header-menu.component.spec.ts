import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderMenuComponent } from './header-menu.component';

describe('HeaderMenuComponent', () => {
  let component: AdminHeaderMenuComponent;
  let fixture: ComponentFixture<AdminHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHeaderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
