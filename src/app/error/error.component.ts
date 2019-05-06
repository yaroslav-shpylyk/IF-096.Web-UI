import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  template:
  `<div class="errorComponent">
    <h1 mat-dialog-title>Виникла помилка!</h1>
    <div mat-dialog-content>
      <p class="mat-body-1">{{ data?.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Ок</button>
    </div>
 </div>`,
  styles: [`.errorComponent {color: red;}`]
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
