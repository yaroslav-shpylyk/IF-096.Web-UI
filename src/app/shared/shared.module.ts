import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderMenuComponent } from '../admin-panel/admin-panel/header-menu/header-menu.component';
import { AdminFooterMenuComponent } from '../admin-panel/admin-panel/footer-menu/footer-menu.component';
import { AvatarComponent } from './avatar/avatar.component';
import { StudentHeaderMenuComponent } from '../student-book/header-menu/header-menu.component';
import { StudentFooterMenuComponent } from '../student-book/footer-menu/footer-menu.component';
import { TeacherHeaderMenuComponent } from '../journal/header-menu/header-menu.component';
import { TeacherFooterMenuComponent } from '../journal/footer-menu/footer-menu.component';
import { SubjectAttachmentDialogComponent } from './subject-attachment-dialog/subject-attachment-dialog.component';
import { PdfViewerModule } from 'borm-ng2-pdf';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminFooterMenuComponent,
    AdminHeaderMenuComponent,
    AvatarComponent,
    StudentHeaderMenuComponent,
    StudentFooterMenuComponent,
    TeacherHeaderMenuComponent,
    TeacherFooterMenuComponent,
    SubjectAttachmentDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PdfViewerModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AvatarComponent
  ],
  entryComponents: [SubjectAttachmentDialogComponent]
})
export class SharedModule { }
