import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewYearComponent } from "./new-year/new-year.component";

const routes: Routes = [
  {
    path: '',
    component: NewYearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewYearRoutingModule { }
