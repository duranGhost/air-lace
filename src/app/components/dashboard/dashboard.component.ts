import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatGridListModule, 
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  images = [
    { id: 1, title: 'Montañas de la Costa', url: 'https://picsum.photos/id/10/400/300' },
    { id: 2, title: 'Sendero del Bosque', url: 'https://picsum.photos/id/16/400/300' },
    { id: 3, title: 'Mar Abierto', url: 'https://picsum.photos/id/22/400/300' },
  ];

  async logout() {
    try {
      console.log('Cerrando sesión en Supabase...');
      await this.authService.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      this.router.navigate(['/login']);
    }
  }
}