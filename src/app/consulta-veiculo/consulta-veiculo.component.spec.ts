import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVeiculoComponent } from './consulta-veiculo.component';

describe('ConsultaVeiculoComponent', () => {
  let component: ConsultaVeiculoComponent;
  let fixture: ComponentFixture<ConsultaVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaVeiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
