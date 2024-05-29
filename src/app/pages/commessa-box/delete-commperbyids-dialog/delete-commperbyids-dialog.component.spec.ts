import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommperbyidsDialogComponent } from './delete-commperbyids-dialog.component';

describe('DeleteCommperbyidsDialogComponent', () => {
  let component: DeleteCommperbyidsDialogComponent;
  let fixture: ComponentFixture<DeleteCommperbyidsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCommperbyidsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCommperbyidsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
