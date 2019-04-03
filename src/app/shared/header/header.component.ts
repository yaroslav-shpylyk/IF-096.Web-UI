import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * open and close burger menu icon
   */
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
