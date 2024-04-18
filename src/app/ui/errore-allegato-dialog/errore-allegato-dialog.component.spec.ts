import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroreAllegatoDialogComponent } from './errore-allegato-dialog.component';

describe('ErroreAllegatoDialogComponent', () => {
  let component: ErroreAllegatoDialogComponent;
  let fixture: ComponentFixture<ErroreAllegatoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErroreAllegatoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErroreAllegatoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
