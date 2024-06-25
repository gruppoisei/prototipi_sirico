import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleTestiAspettiComponent } from './modale-testi-aspetti.component';

describe('ModaleTestiAspettiComponent', () => {
  let component: ModaleTestiAspettiComponent;
  let fixture: ComponentFixture<ModaleTestiAspettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModaleTestiAspettiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaleTestiAspettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
