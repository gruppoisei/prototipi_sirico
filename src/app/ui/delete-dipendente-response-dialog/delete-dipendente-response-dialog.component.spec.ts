import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDipendenteResponseDialogComponent } from './delete-dipendente-response-dialog.component';

describe('DeleteDipendenteResponseDialogComponent', () => {
  let component: DeleteDipendenteResponseDialogComponent;
  let fixture: ComponentFixture<DeleteDipendenteResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDipendenteResponseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDipendenteResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
