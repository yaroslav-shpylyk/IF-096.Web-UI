import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFooterMenuComponent } from './footer-menu.component';

describe('FooterMenuComponent', () => {
  let component: AdminFooterMenuComponent;
  let fixture: ComponentFixture<AdminFooterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFooterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
