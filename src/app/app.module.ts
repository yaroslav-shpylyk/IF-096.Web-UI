import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeachersStorageService } from './services/teachers-storage.service';
import { FlexLayoutModule } from '@angular/flex-layout';
<<<<<<< HEAD
import { DialogOverviewExampleDialog } from './admin-panel/teachers/teachers-list/dialog/dialog-overview';
import { TeacherService } from './services/teacher.service';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectService } from './services/subject.service';
>>>>>>> master

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
=======
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> master
  ],
  providers: [
    AuthService,
    TeachersStorageService,
<<<<<<< HEAD
    TeachersService,
    TeacherService,
=======
    SubjectService,
>>>>>>> master
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
