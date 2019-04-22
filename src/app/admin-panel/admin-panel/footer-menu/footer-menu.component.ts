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

  constructor(private router: Router) { }

  activeRoute(): boolean {
    [this.pathActive, this.iconActive, this.nameActive] =
      [this.routesMore[0].path, this.routesMore[0].icon, this.routesMore[0].name];
    switch (this.router.url) {
      case '/admin-panel/subjects':
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[0].path, this.routesMore[0].icon, this.routesMore[0].name];
        break;
      case '/journals':
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[1].path, this.routesMore[1].icon, this.routesMore[1].name];
        break;
      case '/admin-panel/schedule':
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[2].path, this.routesMore[2].icon, this.routesMore[2].name];
        break;
      case '/admin-panel/teacher-connection':
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[3].path, this.routesMore[3].icon, this.routesMore[3].name];
        break;
      case '/admin-panel/new-year-transition':
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[4].path, this.routesMore[4].icon, this.routesMore[4].name];
        break;
    }
    return true;
  }

  ngOnInit() {
  }

}
