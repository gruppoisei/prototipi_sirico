import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResponseDialogComponent } from './message-response-dialog.component';

describe('MessageResponseDialogComponent', () => {
  let component: MessageResponseDialogComponent;
  let fixture: ComponentFixture<MessageResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageResponseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
