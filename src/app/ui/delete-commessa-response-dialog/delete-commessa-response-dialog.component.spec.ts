import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommessaResponseDialogComponent } from './delete-commessa-response-dialog.component';

describe('DeleteCommessaResponseDialogComponent', () => {
  let component: DeleteCommessaResponseDialogComponent;
  let fixture: ComponentFixture<DeleteCommessaResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCommessaResponseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCommessaResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
