import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
   * Method calls login subscription and directs for received role
   * @param data - Username and password
   */
  login(data): void {
    this.auth.login(data).subscribe(()=>{
      if(this.auth.getUserRole()==='ROLE_ADMIN'){
        this.router.navigate(['/shell/admin-panel/']);
      }else if(this.auth.getUserRole()==='ROLE_TEACHER'){
        this.router.navigate(['/shell/journal/']);
      }else if(this.auth.getUserRole()==='ROLE_USER'){
        this.router.navigate(['/shell/student-book/']);
      }
    });
  }

  ngOnInit() {
  }
}
