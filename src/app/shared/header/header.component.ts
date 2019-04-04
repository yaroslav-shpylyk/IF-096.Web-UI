import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
    const header = document.getElementById('header');
    let isScrolling;
    // Listen for scroll events
    window.addEventListener('scroll', (event) => {
      header.classList.add('hide');
      header.classList.remove('notransition');
      window.clearTimeout(isScrolling);
      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(() => {
        header.classList.remove('hide');
        header.classList.remove('notransition');
      }, 2000);
    }, false);
    // Listen for scroll events
    // when user scroll to top of the page
    window.addEventListener('scroll', (event) => {
      const body = document.body;
      let doc = document.documentElement;
      doc = (doc.clientHeight) ? doc : body;
      if (doc.scrollTop >= 0 && doc.scrollTop <= 50) {
        header.classList.add('notransition');
        header.classList.remove('hide');
      }
    });
  }
}
