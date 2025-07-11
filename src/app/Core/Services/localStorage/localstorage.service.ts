import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private tokenKey = 'authToken';

  // نبدأ بقيمة التوكن الحالية من localStorage
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.tokenKey));

  // مخرج للناس اللي حابة تشترك (subscribe) عليه
  token$ = this.tokenSubject.asObservable();

  constructor() {}

  // حفظ التوكن وتحديث الـ BehaviorSubject
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token); // تحديث القيمة
  }

  // جلب التوكن الحالي
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  // حذف التوكن وتحديث الـ BehaviorSubject
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null); // قيمة فاضية بعد الحذف
    localStorage.clear();
  }

  // معرفة حالة تسجيل الدخول
  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }
}
