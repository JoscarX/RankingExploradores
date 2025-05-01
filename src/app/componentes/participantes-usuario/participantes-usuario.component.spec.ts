import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantesUsuarioComponent } from './participantes-usuario.component';

describe('ParticipantesUsuarioComponent', () => {
  let component: ParticipantesUsuarioComponent;
  let fixture: ComponentFixture<ParticipantesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantesUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
