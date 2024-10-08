import { Injectable, OnInit, Inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Injectable({
  providedIn: 'root'
})
export class AppServices implements OnInit  {

  constructor(
    @Inject(TranslationService) private translationService: TranslationService,) {

      this.ngOnInit();
  }

  ngOnInit() : void {
    this.translationService.loadTranslations('cr').subscribe(() => {
      console.log(this.getLabel('TITLE_LOGIN_PAGE'))
    });
  }

  getLabel(key: string): string {
    return this.translationService.translate(key);
  }

}
