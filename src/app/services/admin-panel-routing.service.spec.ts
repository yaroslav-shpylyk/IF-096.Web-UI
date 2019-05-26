import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPanelRoutingService } from './admin-panel-routing.service';
import { Router } from '@angular/router';

describe('AdminPanelRoutingService checks truncateName method', () => {
  let adminPanelRoutingService: AdminPanelRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AdminPanelRoutingService
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    adminPanelRoutingService = TestBed.get(AdminPanelRoutingService);
  });
  it('should truncate name if longer than 2nd parameter and add …', () => {
    expect(adminPanelRoutingService.truncateName('Khrystyna', 5)).toBe('Khrys…');
  });
  it('should not truncate name if it is shorter than 2nd parameter', () => {
    expect(adminPanelRoutingService.truncateName('Khrystyna', 10)).toBe('Khrystyna');
  });
});

describe('AdminPanelRoutingService checks activeRoute method for active urls from dropdown menu', () => {
  let adminPanelRoutingService: AdminPanelRoutingService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AdminPanelRoutingService,
        {
          provide: Router,
          useValue: {
            url: '/admin-panel/subjects'
          }
        }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    adminPanelRoutingService = TestBed.get(AdminPanelRoutingService);
    router = TestBed.get(Router);
  });
  it('should return correct path, icon, name, active class for /admin-panel/subjects path', () => {
    expect(adminPanelRoutingService.activeRoute())
      .toEqual({path: '/admin-panel/subjects', icon: 'library_books', name: 'Предмети', active: true});
  });
});

describe('AdminPanelRoutingService checks activeRoute method for active urls from static menu', () => {
  let adminPanelRoutingService: AdminPanelRoutingService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AdminPanelRoutingService,
        {
          provide: Router,
          useValue: {
            url: '/admin-panel'
          }
        }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    adminPanelRoutingService = TestBed.get(AdminPanelRoutingService);
    router = TestBed.get(Router);
  });
  it('should return correct default path, icon, name, active class for /admin-panel path', () => {
    expect(adminPanelRoutingService.activeRoute())
      .toEqual({path: '/admin-panel/groups', icon: 'group_work', name: 'Класи', active: false});
  });
});
