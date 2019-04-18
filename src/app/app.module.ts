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
import { JournalsStorageService } from './services/journals-storage.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from './services/teacher.service';
import { SubjectService } from './services/subject.service';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
