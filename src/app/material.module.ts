import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
         MatToolbarModule, MatListModule, MatSidenavModule,
         MatDatepickerModule, MatNativeDateModule
        } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}
