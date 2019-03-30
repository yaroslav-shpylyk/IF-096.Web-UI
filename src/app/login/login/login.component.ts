import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private auth: AuthService) {
    this.createForm();
  }

  /**
   * Method creates reactive form for login component
   */
  createForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  /**
   * Method calls login subscription
   * @param data - Username and password
   */
  login(data): void {
    this.auth.login(data).subscribe();
  }
  ngOnInit() {
  }

}
