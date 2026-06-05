import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  
  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.initSession();
  }

  private async initSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    if (session) {
      this._currentUser.set(session.user);
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      this._currentUser.set(session?.user ?? null);
    });
  }

  async signUp(email: string, pass: string) {
    return await this.supabase.auth.signUp({ email, password: pass });
  }

  async signIn(email: string, pass: string) {
    return await this.supabase.auth.signInWithPassword({ email, password: pass });
  }

  async signOut() {
    try {
      await this.supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      this._currentUser.set(null);
    }
  }

}