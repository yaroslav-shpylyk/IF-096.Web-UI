import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild(HeaderComponent) private headerComponent: HeaderComponent;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize')); // trigger resize event to know screen width once the component is created
    this.headerComponent.showHeader(); // subscribe to subject and showMessage header when user stop scrolling after 2 seconds
    this.checkInternetConnection();
  }

  checkInternetConnection() {
    setTimeout(() => {
      if (!navigator.onLine) {
        this.openSnackBar('Немає зєднання з Інтернетом', 'Для оновлення даних відновіть звязок');
      }
    }, 3000);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

