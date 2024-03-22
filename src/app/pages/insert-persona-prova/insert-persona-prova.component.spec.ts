import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPersonaPROVAComponent } from './insert-persona-prova.component';

describe('InsertPersonaPROVAComponent', () => {
  let component: InsertPersonaPROVAComponent;
  let fixture: ComponentFixture<InsertPersonaPROVAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertPersonaPROVAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertPersonaPROVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
