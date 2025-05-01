import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGanadoresComponent } from './add-ganadores.component';

describe('AddGanadoresComponent', () => {
  let component: AddGanadoresComponent;
  let fixture: ComponentFixture<AddGanadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGanadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGanadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
