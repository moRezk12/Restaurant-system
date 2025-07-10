import { Component, ElementRef, EventEmitter, HostListener , Output, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  langOpen = false;
  userOpen = false;
  notifOpen = false;

  @Output() toggle = new EventEmitter<void>();

  isSidebarOpen = false;
  openSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggle.emit();
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    // this.toggle.emit();
  }

  currentLang: string = 'en';

      constructor(private languageService: LanguageService,
        private translate: TranslateService,
        private renderer: Renderer2 ,
        private eRef: ElementRef) {

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

    // Language Dropdown
  toggleLanguageDropdown() {
    this.langOpen = !this.langOpen;
    this.userOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.langOpen = false;
      this.userOpen = false;
      this.notifOpen = false;
    }
  }

  // User Dropdown
  toggleUserDropdown() {
    this.userOpen = !this.userOpen;
    this.langOpen = false;
  }

  // Notification Dropdown
  toggleNotificationDropdown(event: MouseEvent) {
    event.stopPropagation(); // يمنع غلق القائمة فور الضغط
    this.notifOpen = !this.notifOpen;
    this.userOpen = false;
    this.langOpen = false;
  }

  changeLang(lang: string) {
    this.languageService.changeLanguage(lang);
    this.langOpen = false;
    this.toggleLanguageDropdown();
  }

  logout() {
    // add logout logic
    console.log('Logging out...');
  }

}
