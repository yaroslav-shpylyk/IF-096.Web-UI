import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { HeaderListComponent } from './header-list/header-list.component';
import { FooterComponent } from './footer/footer.component';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';

@NgModule({
  declarations: [
    HeaderListComponent,
    FooterComponent,
    StickyHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderListComponent,
    FooterComponent,
    StickyHeaderComponent
  ]
})
export class SharedModule { }
