import { Component, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private hide: boolean;
  private notransition: boolean;
  private isScrolling;
  private stoppedScrolling;
  private commonDisplay: boolean;
  private retinaDisplay: boolean;

  /**
   * listen to window width resizing
   * to get current device screen width
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.commonDisplay = window.matchMedia('(max-width: 600px)').matches; // most smartphones in portrait mode
    this.retinaDisplay = window.matchMedia('(max-width: 600px) ' +
      'and (min-resolution: 2dppx) and (orientation: portrait)').matches; // smartphones with retina display in portrait mode
    this.hideHeader(); // call after every screen width changing (e.g portrait and landscape mode)
  }

  ngAfterViewInit() {
    window.dispatchEvent(new Event('resize')); // trigger resize event to know screen width once the view is created
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
      takeWhile(() => this.commonDisplay || this.retinaDisplay) // subscribe only on mobile screens
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
      takeWhile(() => this.commonDisplay || this.retinaDisplay), // subscribe only on mobile screens
      debounce(() => interval(2000))
    ).subscribe(() => {
      this.hide = false;
      this.notransition = false; // show header when user stops scrolling with 2s delay
    });
  }
}
