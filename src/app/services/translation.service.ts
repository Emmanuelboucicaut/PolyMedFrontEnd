import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};

  constructor(private http: HttpClient) {}

  loadTranslations(lang: string): Observable<void> {
    return this.http.get(`/assets/i18n/${lang}.json`).pipe(
      map((translations: any) => {
        this.translations = translations;
      })
    );
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
