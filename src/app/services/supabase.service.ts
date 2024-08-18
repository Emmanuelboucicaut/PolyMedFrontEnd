// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../supabase.config';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);
  }

  getSupabase(): SupabaseClient {
    return this.supabase;
  }

}
