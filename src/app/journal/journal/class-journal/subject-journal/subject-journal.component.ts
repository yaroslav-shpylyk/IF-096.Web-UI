import { Component, OnInit, ViewChild } from '@angular/core';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { Journal } from 'src/app/models/journal-data';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-subject-journal',
  templateUrl: './subject-journal.component.html',
  styleUrls: ['./subject-journal.component.scss']
})
export class SubjectJournalComponent implements OnInit {
  journal: Journal;
  dataSource = ELEMENT_DATA;
  idSubject: number;
  idClass: number;
  displayedColumns = [
    'name',
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star'
  ];

  constructor(
    private journalsStorageService: JournalsStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.idSubject = +params.subId;
    //   this.idClass = +params.classId;
    //   console.log(this.idSubject);
    //   console.log(this.idClass);
    // });

    // this.journalsStorageService
    //   .getJournaL(this.idSubject, this.idClass)
    //   .subscribe(journal => {
    //     console.log(journal);
    //     this.journal = journal;
    //   });
  }
}

const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];
