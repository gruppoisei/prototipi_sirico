import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRisolviComponent } from './modal-risolvi.component';

describe('ModalRisolviComponent', () => {
  let component: ModalRisolviComponent;
  let fixture: ComponentFixture<ModalRisolviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRisolviComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRisolviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
