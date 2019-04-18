import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { roles } from '../../enum/roles.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public hide: boolean;
  public notransition: boolean;
  private commonDisplay: boolean;
  private retinaDisplay: boolean;
  private scroll = new Subject();

  constructor(public auth: AuthService) {
  }

  /**
   * listen to window width resizing
   * to get current device screen width
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.commonDisplay = window.matchMedia('(max-width: 600px)').matches; // most smartphones in portrait mode
    this.retinaDisplay = window.matchMedia('(max-width: 600px) ' +
      'and (min-resolution: 2dppx) and (orientation: portrait)').matches; // smartphones with retina display in portrait mode
  }

  /**
   * listen to scroll event
   * hide header on mobile devices
   */
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.commonDisplay || this.retinaDisplay) {
      this.scroll.next(this.hideHeader());
    }
  }

  ngOnInit() {
  }

  /**
   * hide header on scroll on mobile view
   */
  hideHeader(): any {
    if (window.scrollY >= 0 && window.scrollY <= 50) {
      this.hide = false;
      this.notransition = true; // add header without delay when user scrolls to the top of the page
    } else {
      this.hide = true;
      this.notransition = false;
    }
  }

  /**
   * show header when user stops scrolling with 2s delay
   */
  showHeader() {
    this.scroll.pipe(
      debounceTime(2000),
    ).subscribe(() => {
      this.hide = false;
      this.notransition = false;
    });
  }

  /**
   * checks user's role for being admin
   * @returns true if user is admin
   */
  isAdmin() {
    const isAdmin = this.auth.getUserRole() === roles.admin;
    return isAdmin;
  }
}
