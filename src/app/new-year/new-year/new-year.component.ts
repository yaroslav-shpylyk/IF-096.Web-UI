import { Component, OnInit } from '@angular/core';
import { NewYearService } from "../../services/new-year.service";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})
export class NewYearComponent implements OnInit {

   public classes=[]; 
  constructor( 
    private newYearTransitition: NewYearService,
    ) { }

  ngOnInit() {
    this.newYearTransitition.getClasses()
    .subscribe(data => {
      this.classes = data.filter((item) => {return item.isActive} ); 
    } );
  }

}
