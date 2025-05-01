import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervivenciaVerComponent } from './supervivencia-ver.component';

describe('SupervivenciaVerComponent', () => {
  let component: SupervivenciaVerComponent;
  let fixture: ComponentFixture<SupervivenciaVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervivenciaVerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervivenciaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
