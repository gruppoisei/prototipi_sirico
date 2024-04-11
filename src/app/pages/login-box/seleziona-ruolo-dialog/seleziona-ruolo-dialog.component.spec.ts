import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezionaRuoloDialogComponent } from './seleziona-ruolo-dialog.component';

describe('SelezionaRuoloDialogComponent', () => {
  let component: SelezionaRuoloDialogComponent;
  let fixture: ComponentFixture<SelezionaRuoloDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelezionaRuoloDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelezionaRuoloDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
