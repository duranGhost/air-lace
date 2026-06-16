import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { DashboardModel } from '../models/dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    async getUserProfile(userId: string) {
        const { data, error } = await this.supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
        return data;
    }

    async obtenerTelefonoSoporte(): Promise<DashboardModel | null> {
        const { data, error } = await this.supabase
            .from('user_detail_data')
            .select('phone_number, url')
            .eq('support_type', 'whatsapp')
            .single();

        if (error) {
            console.error('Error fetching support phone number:', error);
            return null;
        }

        console.log('Número de teléfono de soporte obtenido:', data?.phone_number);

        return data;
    }

}