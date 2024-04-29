import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvassComponent } from './provass.component';

describe('ProvassComponent', () => {
  let component: ProvassComponent;
  let fixture: ComponentFixture<ProvassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
