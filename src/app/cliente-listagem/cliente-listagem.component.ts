import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './../cliente';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ClienteListagemComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado?: Cliente;

  constructor(private servico: ClienteService, private router: Router,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
    console.log(event)
    this.router.navigate(['/clientes-detalhe', event.data.id]);
  }

  onNovo(event: any): void {
    this.router.navigate(['/clientes-detalhe/new']);
  }

  onAtualizar(event: any): void {
    this.router.navigate(['/clientes-detalhe']);
  }

/*   onExcluir(event: any): void {
    console.log("excluir")
    console.log(event)
    this.servico.deleteCliente(cliente.id).subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
  } */

  deleteCliente(cliente: Cliente) {
    console.log(cliente.id)
    
    this.servico.deleteCliente(cliente.id).subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
}

  onCancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
