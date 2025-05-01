import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciaSubrevivienteComponent } from './competencia-subreviviente.component';

describe('CompetenciaSubrevivienteComponent', () => {
  let component: CompetenciaSubrevivienteComponent;
  let fixture: ComponentFixture<CompetenciaSubrevivienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenciaSubrevivienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciaSubrevivienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
