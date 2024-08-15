import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-cadastrar-editar-categoria',
  templateUrl: './cadastrar-editar-categoria.component.html',
  styleUrls: ['./cadastrar-editar-categoria.component.css']
})
export class CadastrarEditarCategoriaComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
    private service: CategoriaService,
    private mensagemService: MensagemService) { }


  formCategoria: FormGroup = new FormGroup({
    id: new FormControl('', null),
    nome: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(4)])),
  });

  ngOnInit(): void {

    if(!!this.data.id){

      this.service.getCategoriaById(this.data.id).subscribe((res)=>{

        this.formCategoria.setValue(res);

      } );  
    }
  }

  salvar() {
    const categoria: Categoria = this.formCategoria.value;

    console.log(this.data.id);

    if (!!categoria.id) {
      this.atualizarCategoria(categoria);
    } else {
      this.cadastrarCategoria(categoria);
    }
  }
  
  atualizarCategoria(categoria: Categoria) {

    this.service.updateCategoria(categoria.id, categoria).subscribe(() => {
      this.mensagemService.success("A Categoria foi atualizada com sucesso!");
    }, () => {
      this.mensagemService.error("Não foi possível atualizada a categoria.");
    });

  }

  cadastrarCategoria(categoria: Categoria) {

    this.service.createCategoria(categoria).subscribe(() => {
      this.mensagemService.success("A Categoria foi criada com sucesso!");
    }, () => {
      this.mensagemService.error("Não foi possível criar a categoria.");
    });
  }
}