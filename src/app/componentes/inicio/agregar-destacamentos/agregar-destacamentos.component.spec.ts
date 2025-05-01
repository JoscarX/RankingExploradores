import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDestacamentosComponent } from './agregar-destacamentos.component';

describe('AgregarDestacamentosComponent', () => {
  let component: AgregarDestacamentosComponent;
  let fixture: ComponentFixture<AgregarDestacamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDestacamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDestacamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
