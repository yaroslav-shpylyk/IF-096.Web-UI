import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class AdminFooterMenuComponent implements OnInit {

  public routes = [ // array for static button links on bottom navigation
    {
      path: '/admin-panel/students',
      icon: 'school',
      name: 'Учні'
    },
    {
      path: '/admin-panel/teachers',
      icon: 'person',
      name: 'Вчителі'
    }
  ];

  public routesMore = [ // array for button links on 3 dots menu
    {
      path: '/admin-panel/groups',
      icon: 'group_work',
      name: 'Класи'
    },
    {
      path: '/admin-panel/subjects',
      icon: 'library_books',
      name: 'Предмети'
    },
    {
      path: '/journals',
      icon: 'collections_bookmark',
      name: 'Журнали'
    },
    {
      path: '/admin-panel/schedule',
      icon: 'today',
      name: 'Розклад'
    },
    {
      path: '/admin-panel/teacher-connection',
      icon: 'person_add',
      name: 'Додати вчителя до журналу'
    },
    {
      path: '/admin-panel/new-year-transition',
      icon: 'queue',
      name: 'Новий навчальний рік'
    }
  ];

  public iconActive: string; // icon for third section in bottom navigation menu
  public nameActive: string; // name
  public pathActive: string; // path
  public active: boolean; // active route

  constructor(public auth: AuthService, private router: Router) {
  }

  /**
   * change third section in bottom navigation
   * depending on selected routing from 3 dots menu
   * show name, icon, route depending on selected section
   * Classes is shown by default
   */
  activeRoute() {

    for (const i in this.routesMore) { // link buttons from 3 dots menu
      if (this.router.url === this.routesMore[i].path) { // show path, icon, route depending on route path
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[i].path, this.routesMore[i].icon, this.truncateName(this.routesMore[i].name, 10)];
        this.active = true; // highlight section
      }
      if (this.router.url.slice(0, 15) === '/journals/class') { // show Journals for separate journal
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[2].path, this.routesMore[2].icon, this.routesMore[2].name];
        this.active = true; // highlight section
      }
    }
    for (const i in this.routes) { // link buttons from static menu
      if (this.router.url === this.routes[i].path || this.router.url === '/admin-panel') {
        this.active = false; // remove class for highlighting section in third section
      }
    }
  }

  /**
   * truncate name if it is longer than specified characters in bottom navigation menu
   * @param name of route path
   * @param size of allowed characters
   * @returns name or truncated name (if it is too long)
   */
  truncateName(name, size): string {
    return name.length > size ? name.slice(0, size) + '…' : name;
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.activeRoute();
    }); // call on every routing change
    [this.pathActive, this.iconActive, this.nameActive] =
      [this.routesMore[0].path, this.routesMore[0].icon, this.routesMore[0].name]; // show Classes by default
    this.activeRoute(); // call to check which section is selected when component is created
  }
}
