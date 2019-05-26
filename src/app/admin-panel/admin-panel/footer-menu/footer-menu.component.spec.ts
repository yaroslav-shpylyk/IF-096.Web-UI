import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFooterMenuComponent } from './footer-menu.component';
import { MatIconModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../../services/auth.service';

describe('AdminFooterMenuComponent', () => {
  let component: AdminFooterMenuComponent;
  let fixture: ComponentFixture<AdminFooterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ],
      declarations: [
        AdminFooterMenuComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
