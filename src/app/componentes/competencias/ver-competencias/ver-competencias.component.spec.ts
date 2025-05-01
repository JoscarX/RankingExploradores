import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCompetenciasComponent } from './ver-competencias.component';

describe('VerCompetenciasComponent', () => {
  let component: VerCompetenciasComponent;
  let fixture: ComponentFixture<VerCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCompetenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
