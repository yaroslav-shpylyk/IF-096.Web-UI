import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private hide: boolean;
  private notransition: boolean;
  private isScrolling;
  private stoppedScrolling;

  ngOnInit() {
    this.isScrolling = fromEvent(window, 'scroll')
      .subscribe(() => {
        if (window.scrollY >= 0 && window.scrollY <= 50) {
          this.hide = false;
          this.notransition = true; // add header without delay when user scrolls to the top of the page
        } else {
          this.hide = true;
          this.notransition = false; // run when user is scrolling
        }
      });

    this.stoppedScrolling = fromEvent(window, 'scroll').pipe(
      debounce(() => interval(2000))
    ).subscribe(() => {
      this.hide = false;
      this.notransition = false;
    });
  }

  ngOnDestroy(): void {
    this.isScrolling.unsubscribe();
    this.stoppedScrolling.unsubscribe();
  }
}
