import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import {MaterialModule} from '../material.module';
import {HeaderComponent} from '../header/header.component';
import {SidenavListComponent} from '../sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, SidenavListComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MaterialModule
  ]
})
export class ShellModule { }
