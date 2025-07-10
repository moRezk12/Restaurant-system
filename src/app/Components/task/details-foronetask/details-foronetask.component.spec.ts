import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsForonetaskComponent } from './details-foronetask.component';

describe('DetailsForonetaskComponent', () => {
  let component: DetailsForonetaskComponent;
  let fixture: ComponentFixture<DetailsForonetaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsForonetaskComponent]
    });
    fixture = TestBed.createComponent(DetailsForonetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
