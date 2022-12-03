import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNomeComponent } from './consulta-nome.component';

describe('ConsultaNomeComponent', () => {
  let component: ConsultaNomeComponent;
  let fixture: ComponentFixture<ConsultaNomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaNomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
