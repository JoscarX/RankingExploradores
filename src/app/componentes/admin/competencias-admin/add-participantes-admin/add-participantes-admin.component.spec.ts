import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantesAdminComponent } from './add-participantes-admin.component';

describe('AddParticipantesAdminComponent', () => {
  let component: AddParticipantesAdminComponent;
  let fixture: ComponentFixture<AddParticipantesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParticipantesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipantesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
