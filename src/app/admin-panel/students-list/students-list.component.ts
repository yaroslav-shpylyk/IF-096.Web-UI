import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';



@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  activeClass: any;
  notActiveClass:any;
  toShowNotactiveClass: boolean = false;

  constructor(private classList: ClassService) { }

  ngOnInit() {
    // console.log(this.route.snapshot.data.students)
    // this.activeClass = this.route.snapshot.data.students;
    this.classList.getClasses().subscribe((data:any) =>{
      this.activeClass = data.filter((items:any)=>items.isActive===true);
      this.notActiveClass=data.filter((items:any)=>items.isActive===false);
    })
    
  }

  showNotActiveClasses(){
    this.toShowNotactiveClass=!false;
    
  }


}
