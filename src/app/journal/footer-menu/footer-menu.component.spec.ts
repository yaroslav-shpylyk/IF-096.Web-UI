import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherFooterMenuComponent } from './footer-menu.component';
import { MatIconModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';

describe('TeacherFooterMenuComponent', () => {
  let component: TeacherFooterMenuComponent;
  let fixture: ComponentFixture<TeacherFooterMenuComponent>;

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
        TeacherFooterMenuComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
