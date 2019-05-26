import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminPanelRoutingService } from '../../../services/admin-panel-routing.service';

@Component({
  selector: 'app-admin-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class AdminHeaderMenuComponent implements OnInit, OnDestroy {
  public iconActive: string; // icon for third section in header menu
  public nameActive: string; // name
  public pathActive: string; // path
  public active: boolean; // active route
  private routerChange;

  constructor(public auth: AuthService,
              private router: Router,
              private adminPanelRoutingService: AdminPanelRoutingService) {
  }

  ngOnInit() {
    this.routerChange = this.router.events.subscribe(() => {
      this.changeSection();
    }); // call on every routing change
    this.changeSection(); // call to check which section is selected when component is created
  }

  ngOnDestroy() {
    this.routerChange.unsubscribe();
  }

  /**
   * change third section in header menu from AdminPanelRoutingService
   * show name, icon, route depending on selected section
   */
  changeSection() {
    this.pathActive = this.adminPanelRoutingService.activeRoute().path;
    this.iconActive = this.adminPanelRoutingService.activeRoute().icon;
    this.nameActive = this.adminPanelRoutingService.activeRoute().name;
    this.active = this.adminPanelRoutingService.activeRoute().active;
  }
}
