import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

  constructor(private servico: ClienteService, private router: Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }


  mensagemErro = '';
  cliente?: Cliente;
  id = '0';

  meuForm = this.formBuilder.group(
    {nome: ['', [Validators.required, Validators.minLength(3)]]}
  );

  ngOnInit(): void {
    this.mensagemErro = '';
    this.route.paramMap.subscribe(
      (retorno: ParamMap) => {
        const id = retorno.get('id') || '0';
        this.id = id;
        this.servico.getClienteById(id).subscribe({
          next: (cliente: Cliente) => {
            this.cliente = cliente;
            this.meuForm.value.nome = this.cliente.nome;
          },
          error: (error: any) => {
            console.log(error);
            if (error.status === 404) {
              this.mensagemErro = 'Erro: registro não encontrado';
            } else {
              this.mensagemErro = 'Erro desconhecido';
            }
          },
          complete: () => console.log('Cliente carregado')
        });
      }
    );
  }

  onAtualizar(): void {
    console.log(this.meuForm.value);
    this.servico.updateCliente(this.id, this.meuForm.value).subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
  }

  onCancelar(): void {
    this.router.navigate(['/clientes']);
  }

}
