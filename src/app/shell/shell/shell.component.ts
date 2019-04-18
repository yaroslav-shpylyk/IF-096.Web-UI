import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild(HeaderComponent) private headerComponent: HeaderComponent;

  constructor() { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize')); // trigger resize event to know screen width once the component is created
    this.headerComponent.showHeader(); // subscribe to subject and show header when user stop scrolling after 2 seconds
  }

}
