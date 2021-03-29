import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.css'],
})
export class ClienteListagemComponent implements OnInit {
  clientes = [];
  clienteSelecionado?: any;

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
    this.router.navigate(['/clientes-detalhe', this.clienteSelecionado.id]);
  }

  myMethod(): void {
    // Create simple observable that emits three values
    const myObservable = of(1, 2, 3);

    // Create observer object
    const myObserver = {
      next: (x: any) => console.log('Observer got a next value: ' + x),
      error: (err: any) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    // Execute with the observer object
    myObservable.subscribe(myObserver);

    // Logs:
    // Observer got a next value: 1
    // Observer got a next value: 2
    // Observer got a next value: 3
    // Observer got a complete notification
  }

}
