import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDipendenteDialogComponent } from './delete-dipendente-dialog.component';

describe('DeleteDipendenteDialogComponent', () => {
  let component: DeleteDipendenteDialogComponent;
  let fixture: ComponentFixture<DeleteDipendenteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDipendenteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDipendenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
