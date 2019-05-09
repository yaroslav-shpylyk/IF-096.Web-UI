import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TeacherHeaderMenuComponent } from './header-menu.component';
import { MatIconModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { TeachersStorageService } from '../../services/teachers-storage.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TeacherData } from '../../models/teacher-data';

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
      providers: [ AuthService, TeachersStorageService ],
      declarations: [ TeacherHeaderMenuComponent, AvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHeaderMenuComponent);
    teacherService = TestBed.get(TeachersStorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('description', inject([HttpClient], (httpClient: HttpClient) => {
//     const teacherData: TeacherData = {
//       avatar: 'avatar',
//       dateOfBirth: '1979-12-15',
//       email: 'email@email.com',
//       firstname: 'Ivan',
//       lastname: 'Sirko',
//       patronymic: 'patronymic',
//       phone: '380948939',
//       id: 123,
//       login: 'login',
//       newPass: 'newpass',
//       oldPass: 'oldpass',
//       journalData: []
//     }
//     spyOn(httpClient, 'get').and.returnValue(of(teacherData)); // Some array with builds objects?
//     teacherService.getTeacher(teacherData.id).subscribe(result => {
//       expect(result).toEqual(teacherData); // Your expected builds array previously set in spy
//     });
// }));
});
