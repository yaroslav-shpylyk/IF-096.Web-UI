import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template:
   `<button>
      <span class="material-icons" title="Натисніть щоб повернутися назад;" routerLink="../"> arrow_back </span>
    </button>
    <div>
      <i class="material-icons"> error_outline </i>
      <p> Вибачте, сторінка не знайдена </p>
    </div>`,
  styles:
   [
    `div {text-align: center; font-size: 3em; color: #1565c0;}
    i {font-size: 2em; color: red;}
    button { margin: 3%;}`
   ]
})
export class NotFoundComponent {}
