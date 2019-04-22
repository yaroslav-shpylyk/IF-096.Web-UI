import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-admin-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class AdminHeaderMenuComponent implements OnInit {
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

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
