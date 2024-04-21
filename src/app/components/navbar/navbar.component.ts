import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    const clearPromise = new Promise<void>((resolve) => {
      resolve();
    });
  
    clearPromise.then(() => {
      this.router.navigate(['/login']);
    });
  }
}
