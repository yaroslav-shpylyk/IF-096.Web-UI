import { Component, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-sticky-button',
  templateUrl: './sticky-button.component.html',
  styleUrls: ['./sticky-button.component.scss']
})
export class StickyButtonComponent {
  @Input() iconName: string;

  @Output() btnClick = new EventEmitter<any>();
  stickyBtnClick(increased?: any) {
    this.btnClick.emit(increased);
  }
}
