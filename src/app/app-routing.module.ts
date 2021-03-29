import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteListagemComponent } from './cliente-listagem/cliente-listagem.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'clientes', component: ClienteListagemComponent },
  { path: 'clientes-detalhe/:id', component: ClienteDetalheComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
