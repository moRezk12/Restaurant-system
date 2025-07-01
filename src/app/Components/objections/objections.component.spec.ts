import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionsComponent } from './objections.component';

describe('ObjectionsComponent', () => {
  let component: ObjectionsComponent;
  let fixture: ComponentFixture<ObjectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectionsComponent]
    });
    fixture = TestBed.createComponent(ObjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
