import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-cadastrar-editar-produto',
  templateUrl: './cadastrar-editar-produto.component.html',
  styleUrls: ['./cadastrar-editar-produto.component.css']
})
export class CadastrarEditarProdutoComponent {

  categorias: Categoria[] = [];

  formProduto: FormGroup = new FormGroup({
    id: new FormControl('', null),
    nome: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(4)])),
    preco: new FormControl(null, [Validators.required, Validators.min(0)]),
    categoriaId: new FormControl('', [Validators.required])
  });

  constructor(
    private service: ProdutoService,
    private categoriaService: CategoriaService,
    private mensagemService: MensagemService,
    private dialogRef: MatDialogRef<CadastrarEditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
   this.categoriaService.getAllCategories().subscribe((res) => {
      this.categorias = res;
   })

    if(!!this.data.id){

      this.service.getProductById(this.data.id).subscribe((res)=>{
        res.categoriaId = res.categoria.id;
        this.formProduto.patchValue(res);
      } );  
    }
  }

  salvar(): void {
    if (this.formProduto.valid) {
      console.log("teste")
      const produtoData = this.formProduto.value;
      if(!!produtoData.id){
        this.editarProduto();
      } else {
        this.salvarProduto();
      }
    }
  }

  salvarProduto(): void {
    if (this.formProduto.valid) {
      const produtoData = this.formProduto.value;
      this.service.createProduct(produtoData).subscribe(() => {
        this.mensagemService.success("O produto foi criado com sucesso!");
      }, () => {
        this.mensagemService.error("Não foi possível criar o produto.");
      });
      this.dialogRef.close();
    }
  }

  editarProduto(): void {
    if (this.formProduto.valid) {
      const produtoData = this.formProduto.value;
      this.service.updateProduct(produtoData.id, produtoData).subscribe(() => {
        this.mensagemService.success("O produto foi editado com sucesso!");
      }, () => {
        this.mensagemService.error("Não foi possível editar o produto.");
      });
      this.dialogRef.close();
    }
  }

  formatarPreco() {
    const preco = this.formProduto.get('preco')?.value;
    if (preco) {
      const valorFormatado = parseFloat(preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.formProduto.get('preco')?.setValue(valorFormatado);
    }
  }
}
