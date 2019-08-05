import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MarkTypesService } from '../../services/mark-types.service';
import { MarkType } from '../../models/mark-type';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ManagingMarkTypesComponent } from './managing-mark-types/managing-mark-types.component';

@Component({
  selector: 'app-mark-types',
  templateUrl: './mark-types.component.html',
  styleUrls: ['./mark-types.component.scss']
})
export class MarkTypesComponent implements OnInit {

  constructor(public markTypeService: MarkTypesService, public dialog: MatDialog) { }

  allMarkTypes: MarkType[];
  public displayedColumns: string[] = ['markType', 'markDescription', 'edit'];
  public dataSource: MatTableDataSource<MarkType>;
  @ViewChild(MatSort) sort: MatSort;
  prevScrollpos = window.pageYOffset;
  scroll = 'scrollTop';
  marks: Observable<MarkType[]>;
  @HostListener('window:scroll', [])

  ngOnInit() {
    this.getMarkTypes();
  }

  /**
   * The method gets all types of marks and assigns them into data for a table view
   */

  getMarkTypes() {
    this.markTypeService.getAllMarkTypes().subscribe(
      markTypes => {
        this.allMarkTypes = markTypes;
        this.dataSource = new MatTableDataSource(this.allMarkTypes);
        this.dataSource.sort = this.sort;
      }
    );
  }

  /**
   * Method open a dialog window, send data to the dialog window and update the list of mark types
   * @param markType - data which sends to the dialog window
   */
  editMarkType(markType: MarkType | false, index?: number) {
    console.log(index);
    const markData = (markType) ? markType : {markType: '', description: '', id: 0, active: true};
    const markTypePosition = (index) ? index : this.allMarkTypes.length;
    const dialogRef = this.dialog.open(ManagingMarkTypesComponent, { data: markData });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res === undefined) { return; }
        this.allMarkTypes[markTypePosition] = res.data;
        this.dataSource.data = this.allMarkTypes;
      }
    );
  }

  /**
   * Method which filter value in table,removes the leading
   * and trailing white space and line terminator characters from a string.
   * @param filterValue - input value for which is filtered
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onScrollEvent() {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      this.scroll = 'scrollTop';
    } else {
      this.scroll = 'scrollBottom';
    }
    this.prevScrollpos = currentScrollPos;
  }
}
