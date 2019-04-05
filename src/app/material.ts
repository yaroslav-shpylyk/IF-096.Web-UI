import { MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule
  ]
})
export class MaterialModule {}
