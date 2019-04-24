import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class AdminHeaderMenuComponent implements OnInit {
  public routes = [
    { path: '/admin-panel/students',
      icon: 'school',
      name: 'Учні'
    },
    { path: '/admin-panel/teachers',
      icon: 'person',
      name: 'Вчителі'
    }
  ];

  public routesMore = [
    { path: '/admin-panel/groups',
      icon: 'group_work',
      name: 'Класи'
    },
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
  private commonDisplay;
  private retinaDisplay;
  public admin = 'Адміністратор';

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.activeRoute();
    });
  }
  activeRoute(): boolean {
    for (const i in this.routesMore) {
      if (this.router.url ===  this.routesMore[i].path) {
        [this.pathActive, this.iconActive, this.nameActive] =
          [this.routesMore[i].path, this.routesMore[i].icon, this.truncateName(this.routesMore[i].name, 10)];
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

  truncateName(name, size): string {
    return name.length > size ? name.slice(0, size) + '…' : name;
  }

  /**
   * listen to window width resizing
   * to get current device screen width
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.commonDisplay = window.matchMedia('(max-width: 700px) and (min-width: 600px)').matches; // most smartphones in portrait mode
    this.retinaDisplay = window.matchMedia('(max-width: 700px) ' +
      'and (min-resolution: 2dppx) and (orientation: portrait)').matches; // smartphones with retina display in portrait mode
    if (this.commonDisplay || this.retinaDisplay) {
    this.truncateName(this.admin, 6);
  }

  }

  ngOnInit() {
    [this.pathActive, this.iconActive, this.nameActive] =
      [this.routesMore[0].path, this.routesMore[0].icon, this.routesMore[0].name];
    this.activeRoute();
  }

}
