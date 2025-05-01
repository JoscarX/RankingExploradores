import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenciasComponent } from './add-competencias.component';

describe('AddCompetenciasComponent', () => {
  let component: AddCompetenciasComponent;
  let fixture: ComponentFixture<AddCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCompetenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
