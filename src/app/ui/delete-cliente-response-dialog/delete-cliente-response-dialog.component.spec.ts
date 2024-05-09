import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClienteResponseDialogComponent } from './delete-cliente-response-dialog.component';

describe('DeleteClienteResponseDialogComponent', () => {
  let component: DeleteClienteResponseDialogComponent;
  let fixture: ComponentFixture<DeleteClienteResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteClienteResponseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteClienteResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
