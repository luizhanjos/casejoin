import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { CadastrarEditarProdutoComponent } from '../cadastrar-editar-produto/cadastrar-editar-produto.component';
import { MensagemService } from 'src/app/services/mensagem.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent {
  
  displayedColumns: string[] = ['nome', 'preco','categoria','acoes'];


  produtos: MatTableDataSource<Produto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ProdutoService, private mensagemService: MensagemService, public dialog: MatDialog) {}

  
  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.service.getAllProducts().subscribe((res) => {
      this.produtos = new MatTableDataSource(res);
      this.produtos.paginator = this.paginator;
    });
  }

  openProductDialog(id?: number): void {
    console.log(id);

    const dialogRef = this.dialog.open(CadastrarEditarProdutoComponent, {
      width: '400px', data: { id: id }
    });
    
    dialogRef.afterClosed().subscribe(() => this.listarProdutos());
  }


  excluirProduto(id: number): void {
    this.service.deleteProducta(id).subscribe(() => {
      this.mensagemService.success("O produto foi excluido com sucesso!");
      this.listarProdutos();
    }, () => {
      this.mensagemService.error("Não foi possível excluir o produto.");
    });
  }
}
