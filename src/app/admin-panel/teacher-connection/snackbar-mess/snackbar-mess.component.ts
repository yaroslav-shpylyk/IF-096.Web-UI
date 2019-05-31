import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar-mess',
  template: `
    <span class="choise-done">
       Новий запис у журналі створено
    </span>`,
  styles: [`
    .choise-done {
      color: white;
  }
  `]
})
export class SnackbarMessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
