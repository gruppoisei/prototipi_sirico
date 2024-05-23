import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommperbyidDialogComponent } from './delete-commperbyid-dialog.component';

describe('DeleteCommperbyidDialogComponent', () => {
  let component: DeleteCommperbyidDialogComponent;
  let fixture: ComponentFixture<DeleteCommperbyidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCommperbyidDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCommperbyidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
