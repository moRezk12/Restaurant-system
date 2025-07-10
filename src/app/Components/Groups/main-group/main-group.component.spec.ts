import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGroupComponent } from './main-group.component';

describe('MainGroupComponent', () => {
  let component: MainGroupComponent;
  let fixture: ComponentFixture<MainGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainGroupComponent]
    });
    fixture = TestBed.createComponent(MainGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
