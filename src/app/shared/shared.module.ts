import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { HeaderListComponent } from './header-list/header-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderListComponent,
    FooterComponent,
    FooterMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    HeaderListComponent,
    FooterComponent,
    FooterMenuComponent
  ]
})
export class SharedModule { }
