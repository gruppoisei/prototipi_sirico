import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommessaDialogComponent } from './delete-commessa-dialog.component';

describe('DeleteCommessaDialogComponent', () => {
  let component: DeleteCommessaDialogComponent;
  let fixture: ComponentFixture<DeleteCommessaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCommessaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCommessaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
