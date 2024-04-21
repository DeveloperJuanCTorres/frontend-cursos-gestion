import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'gestion-cursos';
  isLogged: boolean = false;
  
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      const user = localStorage.getItem('user');
      this.isLogged = user ? true : false;

      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (this.isLogged && url == '/login') {
          this.router.navigate(['/dashboard']);
        } else if (!this.isLogged && url != '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
