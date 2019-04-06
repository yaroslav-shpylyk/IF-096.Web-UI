import { AfterViewInit, Component } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  ngAfterViewInit() {
    const header = document.getElementById('header');

    const isScrolling = fromEvent(window, 'scroll')
      .subscribe(() => {
        let doc = document.documentElement;
        doc = (doc.clientHeight) ? doc : document.body;

        if (doc.scrollTop >= 0 && doc.scrollTop <= 50) {
          header.classList.add('notransition');
          header.classList.remove('hide'); // add header without delay when user scroll to top of the page
        } else {
          header.classList.add('hide');
          header.classList.remove('notransition'); // run when user is scrolling
          console.log('fi');
        }
      });

    const stoppedScrolling = fromEvent(window, 'scroll').pipe(
      debounce(() => interval(2000))
    ).subscribe(() => {
      header.classList.remove('hide');
      header.classList.remove('notransition');
      console.log('se');
    }); // run after scroll is finished with 1.5s delay

    const reloading = fromEvent(window, 'load')
      .subscribe(() => {
        header.classList.add('notransition');
        header.classList.remove('hide');
      }); // always show header after reloading page on any scroll height
  }
}
