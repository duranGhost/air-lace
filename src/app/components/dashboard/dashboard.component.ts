import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    telefonoSoporte: string = '';
    cargandoTelefono: boolean = true;

    constructor(private databaseService: DatabaseService) { }

    async ngOnInit() {
        const telefono = await this.databaseService.obtenerTelefonoSoporte();
        if (telefono) {
            this.telefonoSoporte = telefono;
        }
        this.cargandoTelefono = false;
    }

    images = [
        {
            id: 1,
            title: 'Asesoría técnica especializada',
            description: 'Guiamos al cliente en la identificación correcta del repuesto diésel para mitigar errores.',
            url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=500'
        },
        {
            id: 2,
            title: 'Comercialización de repuestos',
            description: 'Amplio portafolio con disponibilidad inmediata de componentes e inyección de precisión.',
            url: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=500'
        },
        {
            id: 3,
            title: 'Atención integral y Soluciones',
            description: 'Soporte especializado antes, durante y después de la compra. Atención a empresas y sector público.',
            url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=500'
        },
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

    enviarMensajeWhatsApp() {
        if (!this.telefonoSoporte) {
            alert('El servicio de soporte no está disponible en este momento.');
            return;
        }

        const mensaje = '¡Hola! Estoy navegando en el Dashboard y necesito ayuda con mi cuenta.';
        const url = `https://api.whatsapp.com/send?phone=${this.telefonoSoporte}&text=${encodeURIComponent(mensaje)}`;

        window.open(url, '_blank');
    }

}