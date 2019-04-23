import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class AdminFooterMenuComponent implements OnInit {

  public routes = [
    { path: '/admin-panel/students',
      icon: 'school',
      name: 'УЧНІ'
    },
    { path: '/admin-panel/teachers',
      icon: 'person',
      name: 'ВЧИТЕЛІ'
    },
    { path: '/admin-panel/groups',
      icon: 'group_work',
      name: 'КЛАСИ'
    }
  ];

  public routesMore = [
    { path: '/admin-panel/subjects',
      icon: 'library_books',
      name: 'Предмети'
    },
    { path: '/journals',
      icon: 'collections_bookmark',
      name: 'Журнали'
    },
    { path: '/admin-panel/schedule',
      icon: 'today',
      name: 'Розклад'
    },
    { path: '/admin-panel/teacher-connection',
      icon: 'person_add',
      name: 'Додати вчителя до журналу'
    },
    { path: '/admin-panel/new-year-transition',
      icon: 'queue',
      name: 'Новий навчальний рік'
    }
  ];

  public iconActive: string;
  public nameActive: string;
  public pathActive: string;
  public active;

  constructor(private router: Router) { }

  activeRoute(): boolean {
    for (const i in this.routesMore) {
      if (this.router.url ===  this.routesMore[i].path) {
          [this.pathActive, this.iconActive, this.nameActive] =
            [this.routesMore[i].path, this.routesMore[i].icon, this.truncateName(this.routesMore[i].name.toUpperCase())];
          this.active = true;
      }
    }
    for (const i in this.routes) {
      if (this.router.url ===  this.routes[i].path) {
        this.active = false;
      }
    }
    return true;
  }

  truncateName(name): string {
    return name.length > 10 ? name.slice(0, 10) + '…' : name;
  }

  ngOnInit() {
    [this.pathActive, this.iconActive, this.nameActive] =
      [this.routesMore[0].path, this.routesMore[0].icon, this.routesMore[0].name.toUpperCase()];
  }

}
