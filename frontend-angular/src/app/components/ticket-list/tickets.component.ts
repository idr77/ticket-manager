import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: ApiService) {}

  login() {
    this.api.login(this.email, this.password).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      window.location.href = '/tickets';
    });
  }
}
