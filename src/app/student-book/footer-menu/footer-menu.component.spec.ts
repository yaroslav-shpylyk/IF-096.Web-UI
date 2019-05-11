import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFooterMenuComponent } from './footer-menu.component';
import { MatIconModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';

describe('StudentFooterMenuComponent', () => {
  let component: StudentFooterMenuComponent;
  let fixture: ComponentFixture<StudentFooterMenuComponent>;

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
        StudentFooterMenuComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
