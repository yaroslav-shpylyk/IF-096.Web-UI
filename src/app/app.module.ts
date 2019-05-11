import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TeachersStorageService } from './services/teachers-storage.service';
import { SubjectService } from './services/subject.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JournalsStorageService } from './services/journals-storage.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from './services/teacher.service';
import { MatNativeDateModule } from '@angular/material';
import { HomeworkStorageService } from './services/homework-storage.service';

import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './error/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [
    AuthService,
    TeachersStorageService,
    JournalsStorageService,
    SubjectService,
    TeacherService,
    HomeworkStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'ua-UA'},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
