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
  imports: [MatToolbarModule, MatButtonModule, MatGridListModule, MatCardModule],
  template: `
    <mat-toolbar color="primary">
      <span>Air-Lace Dashboard</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()">Cerrar Sesión</button>
    </mat-toolbar>

    <div class="container">
      <h3>Mi Galería Amigable</h3>
      <mat-grid-list cols="3" rowHeight="250px" gutterSize="15px">
        @for (img of images; track img.id) {
          <mat-grid-tile>
            <mat-card class="image-card">
              <img mat-card-image [src]="img.url" alt="Imagen de galería">
              <mat-card-footer class="padding-footer"><h4>{{ img.title }}</h4></mat-card-footer>
            </mat-card>
          </mat-grid-tile>
        }
      </mat-grid-list>
    </div>
  `,
  styles: [`.spacer { flex: 1 1 auto; } .container { padding: 20px; } .image-card { width: 100%; height: 100%; object-fit: cover; } img { height: 170px; object-fit: cover; } .padding-footer { padding: 5px 10px; }`]
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Data mockeada de imágenes amigables para empezar
  images = [
    { id: 1, title: 'Montañas', url: 'https://picsum.photos/id/10/400/300' },
    { id: 2, title: 'Bosque', url: 'https://picsum.photos/id/16/400/300' },
    { id: 3, title: 'Mar', url: 'https://picsum.photos/id/22/400/300' },
  ];

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}