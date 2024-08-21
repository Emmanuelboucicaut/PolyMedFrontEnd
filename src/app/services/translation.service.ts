import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  loadTranslations(lang: string): Observable<void> {
    const baseHref = this.document.getElementsByTagName('base')[0]?.getAttribute('href') || './';
    const path = `${baseHref}assets/i18n/${lang}.json`;

    return this.http.get(path).pipe(
      map((translations: any) => {
        this.translations = translations;
      })
    );
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
