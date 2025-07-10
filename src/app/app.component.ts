import { Component, HostListener, Renderer2 } from '@angular/core';
import { LanguageService } from './Core/Services/Language/language.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'system';

    currentLang: string = 'en';

    constructor(private languageService: LanguageService , private translate: TranslateService, private renderer: Renderer2) {
      this.languageService.getLanguage().subscribe((lang) => {
      this.currentLang = lang;
      this.setLangAttribute(lang);
    });

    }

    setLangAttribute(lang: string) {
    this.renderer.setAttribute(document.body, 'lang', lang);
  }

  // تغيير اللغة
  changeLanguage(lang: string) {
    // استخدام اللغة في ngx-translate
    this.translate.use(lang);
    // تحديث اللغة في LanguageService
    this.languageService.changeLanguage(lang);

    // تعيين الاتجاه بناءً على اللغة المختارة
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', lang);
  }

  // دالة لتغيير اللغة
  toggleLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (value && this.currentLang !== value) {
      this.languageService.changeLanguage(value); // استخدم LanguageService لتغيير اللغة
    }
  }


    showScrollButton = false;

  // وظيفة التمرير لأعلى الصفحة
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
    onWindowScroll() {
      this.showScrollButton = window.pageYOffset > 250;
  }


}
