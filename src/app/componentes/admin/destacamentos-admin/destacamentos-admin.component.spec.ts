import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacamentosAdminComponent } from './destacamentos-admin.component';

describe('DestacamentosAdminComponent', () => {
  let component: DestacamentosAdminComponent;
  let fixture: ComponentFixture<DestacamentosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestacamentosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestacamentosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
