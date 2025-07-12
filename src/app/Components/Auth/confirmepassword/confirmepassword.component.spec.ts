import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmepasswordComponent } from './confirmepassword.component';

describe('ConfirmepasswordComponent', () => {
  let component: ConfirmepasswordComponent;
  let fixture: ComponentFixture<ConfirmepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmepasswordComponent]
    });
    fixture = TestBed.createComponent(ConfirmepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
