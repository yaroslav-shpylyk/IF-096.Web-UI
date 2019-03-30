import { MatButtonModule, MatCheckboxModule, MatListItem } from '@angular/material';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatListModule]
})
export class MaterialModule {}
