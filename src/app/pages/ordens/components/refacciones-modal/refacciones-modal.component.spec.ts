import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefaccionesModalComponent } from './refacciones-modal.component';

describe('RefaccionesModalComponent', () => {
  let component: RefaccionesModalComponent;
  let fixture: ComponentFixture<RefaccionesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefaccionesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefaccionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
