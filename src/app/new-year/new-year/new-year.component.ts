import { Component, OnInit } from '@angular/core';
import { NewYearService } from "../../services/new-year.service";


@Component({
  selector: 'app-new-year',
  templateUrl: './new-year.component.html',
  styleUrls: ['./new-year.component.scss']
})
export class NewYearComponent implements OnInit {

  public classes=[];
  public pupilList=[]; 

  constructor( private newYearTransitition: NewYearService ) {  }

  ngOnInit() {
    this.newYearTransitition.getClasses()
    .subscribe(data => {this.classes = data
      .filter((item) => {return item.isActive && item.numOfStudents>0 })

      this.classes.forEach(
        (schoolClass)=> {
          this.newYearTransitition.getPupilList(schoolClass.id)
           .subscribe( data => schoolClass["pupilList"]=data);
          console.log(schoolClass);
        }
      )
    } );


  }

}
