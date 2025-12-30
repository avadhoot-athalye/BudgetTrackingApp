import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  collapsed = true;
  loggedIn = false;
  userName = 'Jane Doe';

  toggle() {
    this.collapsed = !this.collapsed;
  }

  // For demo purposes - toggles logged-in state
  toggleAuth() {
    this.loggedIn = !this.loggedIn;
  }

  logout() {
    // placeholder - in real app you'd call an auth service
    this.loggedIn = false;
  }
}
