import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherHeaderMenuComponent } from './header-menu.component';
import { MatIconModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { TeachersStorageService } from '../../services/teachers-storage.service';
import { AuthService } from '../../services/auth.service';

fdescribe('TeacherHeaderMenuComponent', () => {
  let component: TeacherHeaderMenuComponent;
  let fixture: ComponentFixture<TeacherHeaderMenuComponent>;
  let teacherService: TeachersStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        TeachersStorageService
      ],
      declarations: [
        TeacherHeaderMenuComponent,
        AvatarComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHeaderMenuComponent);
    teacherService = TestBed.get(TeachersStorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
