import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciaArqueroVerComponent } from './competencia-arquero-ver.component';

describe('CompetenciaArqueroVerComponent', () => {
  let component: CompetenciaArqueroVerComponent;
  let fixture: ComponentFixture<CompetenciaArqueroVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenciaArqueroVerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciaArqueroVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
