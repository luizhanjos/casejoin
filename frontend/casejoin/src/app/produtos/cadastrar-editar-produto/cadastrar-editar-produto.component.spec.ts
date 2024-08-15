import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarProdutoComponent } from './cadastrar-editar-produto.component';

describe('CadastrarEditarProdutoComponent', () => {
  let component: CadastrarEditarProdutoComponent;
  let fixture: ComponentFixture<CadastrarEditarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
