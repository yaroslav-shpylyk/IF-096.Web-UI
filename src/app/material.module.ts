import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class MaterialModule {}
