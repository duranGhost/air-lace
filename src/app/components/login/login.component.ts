import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-title>Iniciar Sesión en Air-Lace</mat-card-title>
        <mat-card-content>
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" type="email">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Contraseña</mat-label>
            <input matInput [(ngModel)]="password" type="password">
          </mat-form-field>
          <button mat-raised-button color="primary" (xclick)="login()">Ingresar</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.login-container { display: flex; justify-content: center; align-items: center; height: 80vh; } mat-card { width: 350px; padding: 20px; } button { width: 100%; margin-top: 10px; }`]
})
export class LoginComponent {
  email = '';
  password = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  async login() {
    const { error } = await this.authService.signIn(this.email, this.password);
    if (!error) {
      this.router.navigate(['/dashboard']);
    } else {
      alert(error.message);
    }
  }
}