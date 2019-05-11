import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentHeaderMenuComponent } from './header-menu.component';
import { MatListModule, MatIconModule } from '@angular/material';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentsService } from '../../services/students.service';

describe('StudentHeaderMenuComponent', () => {
  let component: StudentHeaderMenuComponent;
  let fixture: ComponentFixture<StudentHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        StudentHeaderMenuComponent,
        AvatarComponent
      ],
      providers: [
        AuthService,
        StudentsService
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
