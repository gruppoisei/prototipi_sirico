import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLoginDialogComponent } from './error-login-dialog.component';

describe('ErrorLoginDialogComponent', () => {
  let component: ErrorLoginDialogComponent;
  let fixture: ComponentFixture<ErrorLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorLoginDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
