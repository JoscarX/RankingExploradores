import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasAdminComponent } from './competencias-admin.component';

describe('CompetenciasAdminComponent', () => {
  let component: CompetenciasAdminComponent;
  let fixture: ComponentFixture<CompetenciasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenciasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
