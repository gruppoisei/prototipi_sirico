import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipendentiAssegnatiDialogComponent } from './dipendenti-assegnati-dialog.component';

describe('DipendentiAssegnatiDialogComponent', () => {
  let component: DipendentiAssegnatiDialogComponent;
  let fixture: ComponentFixture<DipendentiAssegnatiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DipendentiAssegnatiDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DipendentiAssegnatiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
