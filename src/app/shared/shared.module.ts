import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { HeaderListComponent } from './header-list/header-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    SidenavListComponent,
    HeaderListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidenavListComponent,
    SidenavComponent,
    HeaderListComponent
  ]
})
export class SharedModule { }
