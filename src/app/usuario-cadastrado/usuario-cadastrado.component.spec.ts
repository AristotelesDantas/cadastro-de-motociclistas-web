import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCadastradoComponent } from './usuario-cadastrado.component';

describe('UsuarioCadastradoComponent', () => {
  let component: UsuarioCadastradoComponent;
  let fixture: ComponentFixture<UsuarioCadastradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCadastradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
