import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPanelRoutingService } from './admin-panel-routing.service';

describe('Service for managing selected section in admin panel menu', () => {
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
