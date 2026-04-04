import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  dir: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLang = signal<string>('en');
  direction = signal<string>('ltr');
  showLangDropdown = signal<boolean>(false);

  languages: Language[] = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'ru', name: 'Русский', dir: 'ltr' },
  ];

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    const selectedLang = this.languages.find((l) => l.code === lang);
    this.currentLang.set(lang);
    this.direction.set(selectedLang?.dir || 'ltr');
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.dir = this.direction();
    document.documentElement.lang = lang;
  }

  toggleLangDropdown(): void {
    this.showLangDropdown.update((v) => !v);
  }

  closeLangDropdown(): void {
    this.showLangDropdown.set(false);
  }

  onLangChange(lang: string): void {
    this.setLanguage(lang);
    this.closeLangDropdown();
  }
}
