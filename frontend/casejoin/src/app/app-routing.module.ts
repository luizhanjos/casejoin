import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { ListarProdutosComponent } from './produtos/listar-produtos/listar-produtos.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'categorias/listar', component: ListarCategoriasComponent },
  { path: 'produtos/listar', component: ListarProdutosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
