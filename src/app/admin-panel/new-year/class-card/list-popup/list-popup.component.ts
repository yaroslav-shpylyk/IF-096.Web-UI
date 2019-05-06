import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Student } from '../../../../models/student';

@Component({
  selector: 'app-list-popup',
  templateUrl: './list-popup.component.html',
  styleUrls: ['./list-popup.component.scss']
})
export class ListPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any)  { }

  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = ['name', 'dateOfBirth'];
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.classList);
    this.dataSource.sort = this.sort;
  }

}
