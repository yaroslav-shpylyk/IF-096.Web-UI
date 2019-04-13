import { Component, OnInit } from '@angular/core';
import { roles } from '../../enum/roles.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  isAdmin() {
    const isAdmin = this.auth.getUserRole() === roles.admin;
    return isAdmin;
  }

}
