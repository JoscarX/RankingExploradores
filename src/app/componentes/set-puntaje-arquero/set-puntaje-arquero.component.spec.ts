import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPuntajeArqueroComponent } from './set-puntaje-arquero.component';

describe('SetPuntajeArqueroComponent', () => {
  let component: SetPuntajeArqueroComponent;
  let fixture: ComponentFixture<SetPuntajeArqueroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPuntajeArqueroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPuntajeArqueroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
