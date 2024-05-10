import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClienteDialogComponent } from './delete-cliente-dialog.component';

describe('DeleteClienteDialogComponent', () => {
  let component: DeleteClienteDialogComponent;
  let fixture: ComponentFixture<DeleteClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteClienteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
