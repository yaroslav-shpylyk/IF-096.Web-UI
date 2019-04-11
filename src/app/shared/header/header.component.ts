import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce, takeWhile } from 'rxjs/operators';

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
  private resize;

  /**
   * listen to window width resizing
   * to get current screen width
   * @param event - resizing screen width
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize = event.target.innerWidth;
    this.hideHeader(); // call after every screen width changing (e.g portrait and landscape mode)
  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize')); // trigger resize event to know screen width once the component is created
  }

  ngOnDestroy(): void {
    this.isScrolling.unsubscribe();
    this.stoppedScrolling.unsubscribe();
  }

  /**
   * hide header on scroll on mobile view
   */
  hideHeader() {
    this.isScrolling = fromEvent(window, 'scroll').pipe(
      takeWhile(() => this.resize <= 599) // subscribe only on mobile screens
    ).subscribe(() => {
      if (window.scrollY >= 0 && window.scrollY <= 50) {
        this.hide = false;
        this.notransition = true; // add header without delay when user scrolls to the top of the page
      } else {
        this.hide = true;
        this.notransition = false; // hide header when user is scrolling
      }
    });

    this.stoppedScrolling = fromEvent(window, 'scroll').pipe(
      takeWhile(() => this.resize <= 599), // subscribe only on mobile screens
      debounce(() => interval(2000))
    ).subscribe(() => {
      this.hide = false;
      this.notransition = false; // show header when user stop scrolling with 2s delay
    });
  }
}
