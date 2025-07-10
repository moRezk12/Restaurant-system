import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePowersComponent } from './create-powers.component';

describe('CreatePowersComponent', () => {
  let component: CreatePowersComponent;
  let fixture: ComponentFixture<CreatePowersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePowersComponent]
    });
    fixture = TestBed.createComponent(CreatePowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
