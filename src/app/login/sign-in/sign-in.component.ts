import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { roles } from '../../enum/roles.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private auth: AuthService,
              private router: Router) {
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
   * Method calls login subscription and and directs for received role
   * @param data - Username and password
   */
  login(data): void {
    this.auth.login(data).subscribe(() => {
      if (this.auth.getUserRole() === roles.admin) {
        this.router.navigate(['/admin-panel/']);
      } else if (this.auth.getUserRole() === roles.teacher) {
        this.router.navigate(['journals', 'my-journals']);
      } else if (this.auth.getUserRole() === roles.students) {
        this.router.navigate(['/student-book/']);
      }
    });
  }

  ngOnInit() {
  }
}
