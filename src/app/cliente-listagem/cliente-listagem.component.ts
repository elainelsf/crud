import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './../cliente';

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.css'],
})
export class ClienteListagemComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado?: Cliente;

  constructor(private servico: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.onGetClientes();
  }

  onGetClientes(): void {
    this.servico.getClientes().subscribe({
      next: (clientes: any) => (this.clientes = clientes),
      error: (error: any) => console.log(error),
      complete: () => console.log('finalizado')
    });
  }

  onRowSelect(event: any): void {
    this.router.navigate(['/clientes-detalhe', event.data.id]);
  }

  onNovo(event: any): void {
    this.router.navigate(['/clientes-detalhe/new']);
  }

  onAtualizar(event: any): void {
    this.router.navigate(['/clientes-detalhe']);
  }

  /*
  onExcluir(): void {
    this.servico.deleteCliente('1007').subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
  }
*/
  onCancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
