import {
  Component,
  AfterViewInit,
  HostBinding,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  throttleTime,
  map,
  pairwise,
  distinctUntilChanged,
  share,
  filter
} from 'rxjs/operators';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-sticky-button',
  templateUrl: './sticky-button.component.html',
  styleUrls: ['./sticky-button.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(+100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class StickyButtonComponent implements AfterViewInit {
  private isVisible = true;

  @Input() iconName: string;
  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  @Output() btnClick = new EventEmitter<any>();
  stickyBtnClick(increased: any) {
    this.btnClick.emit(increased);
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }
}
