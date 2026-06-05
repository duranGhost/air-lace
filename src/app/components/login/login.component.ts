import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  async login() {
    if (!this.email || !this.password) return;

    this.isLoading = true;
    console.log('Iniciando proceso de autenticación para Air-Lace...');

    try {
      const { error } = await this.authService.signIn(this.email, this.password);
      
      if (!error) {
        console.log('Autenticación exitosa. Redireccionando...');
        
        this.snackBar.open('¡Bienvenido a Air-Lace!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });

        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open(`Error: ${error.message}`, 'Entendido', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    } catch (err) {
      console.error('Error inesperado en el cliente de login:', err);
      
      this.snackBar.open('Ocurrió un error inesperado. Inténtalo de nuevo.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } finally {
      this.isLoading = false;
    }
  }
}