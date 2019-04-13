import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { HeaderMenuComponent } from '../admin-panel/admin-panel/header-menu/header-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FooterMenuComponent,
    HeaderMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FooterMenuComponent
  ]
})
export class SharedModule { }
