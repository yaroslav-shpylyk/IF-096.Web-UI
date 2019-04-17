import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderMenuComponent } from '../admin-panel/admin-panel/header-menu/header-menu.component';
import { AdminFooterMenuComponent } from '../admin-panel/admin-panel/footer-menu/footer-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminFooterMenuComponent,
    AdminHeaderMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
