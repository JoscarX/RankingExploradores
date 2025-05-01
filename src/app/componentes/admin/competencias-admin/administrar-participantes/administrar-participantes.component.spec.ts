import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarParticipantesComponent } from './administrar-participantes.component';

describe('AdministrarParticipantesComponent', () => {
  let component: AdministrarParticipantesComponent;
  let fixture: ComponentFixture<AdministrarParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarParticipantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
