
import { Component, OnInit, Inject  } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SupabaseService } from 'src/app/services/supabase.service';
import { TranslationService } from './../../services/translation.service';

@Component({
  selector: 'app-liste-patient',
  templateUrl: './liste-patient.component.html',
  styleUrls: ['./liste-patient.component.css']
})
export class ListePatientComponent implements OnInit {
  records: any[] = [];
  Count : number = 0;

  constructor(
    private supaBaseService : SupabaseService,
    @Inject(TranslationService) private translationService: TranslationService){}

  ngOnInit(): void {
    this.fetchRecords();

    this.translationService.loadTranslations('cr').subscribe(() => {});
  }

  getLabel(key: string): string {
    return this.translationService.translate(key);
  }


  async fetchRecords() {
    const { data, error } = await this.supaBaseService
      .getSupabase()
      .from('Patient')
      .select('*');

      console.log(data);
      console.log('Here',error);
      if(error){
        console.log('Erreur lors de la recuperation des donnees',error);
      }
      else {
        this.records = data || []
      }

      this.Count = data?.length ?? 0;
  }
}
