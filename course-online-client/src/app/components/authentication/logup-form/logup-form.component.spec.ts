import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogupFormComponent } from './logup-form.component';

describe('LogupFormComponent', () => {
  let component: LogupFormComponent;
  let fixture: ComponentFixture<LogupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
