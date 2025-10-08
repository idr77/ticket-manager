import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule]
})
export class AppComponent {
  title = 'Ticket Manager';

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
