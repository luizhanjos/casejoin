import { Component, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { CadastrarEditarCategoriaComponent } from '../cadastrar-editar-categoria/cadastrar-editar-categoria.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent {

  categorias: MatTableDataSource<Categoria> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['nome', 'acoes'];

  constructor(private service: CategoriaService, private mensagemService: MensagemService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.listarCategorias();

  }

  listarCategorias() {

    this.service.getAllCategories().subscribe((res) => {

      this.categorias = new MatTableDataSource(res);
      this.categorias.paginator = this.paginator;

    });
  }

  excluirCategorias(id: number) {
    this.service.deleteCategoria(id).subscribe(() => {
      this.mensagemService.success("A Categoria foi excluida com sucesso!");
      this.listarCategorias();
    }, () => {
      this.mensagemService.error("Não foi possível excluir a categoria.");
    });
  }

  openDialog(id?: number | string ) {

    console.log(id);

    const dialogRef = this.dialog.open(CadastrarEditarCategoriaComponent, {
      width: '400px', data: { id: id }
    });

    dialogRef.afterClosed().subscribe(() => this.listarCategorias());
  }
}
