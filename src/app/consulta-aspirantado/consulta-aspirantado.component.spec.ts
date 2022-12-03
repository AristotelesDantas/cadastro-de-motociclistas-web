import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAspirantadoComponent } from './consulta-aspirantado.component';

describe('ConsultaAspirantadoComponent', () => {
  let component: ConsultaAspirantadoComponent;
  let fixture: ComponentFixture<ConsultaAspirantadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAspirantadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaAspirantadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
