import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatToolbarModule,
  MatIconModule, MatListModule,
  MatSidenavModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ]
})
export class MaterialModule {}
