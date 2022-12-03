import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetivoComponent } from './efetivo.component';

describe('EfetivoComponent', () => {
  let component: EfetivoComponent;
  let fixture: ComponentFixture<EfetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
