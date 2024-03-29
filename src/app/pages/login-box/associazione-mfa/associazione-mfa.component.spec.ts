import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociazioneMFAComponent } from './associazione-mfa.component';

describe('AssociazioneMFAComponent', () => {
  let component: AssociazioneMFAComponent;
  let fixture: ComponentFixture<AssociazioneMFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociazioneMFAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociazioneMFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
