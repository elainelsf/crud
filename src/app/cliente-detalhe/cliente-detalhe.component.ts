import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

  constructor(private servico: ClienteService, private router: Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }


  mensagemErro = '';
  id = '0';
  isNew = false;

  meuForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    this.mensagemErro = '';
    this.route.paramMap.subscribe(
      (retorno: ParamMap) => {
        const id = retorno.get('id') || '0';
        this.id = id;
        if (id === 'new') {
          this.isNew = true;
        } else {
          this.servico.getClienteById(id).subscribe({
            next: (cliente: Cliente) => {
              this.meuForm.patchValue(cliente);
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
      }
    );
  }

  onAtualizar(): void {
    this.servico.updateCliente(this.id, this.meuForm.value).subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
  }

  onIncluir(): void {
    this.servico.addCliente(this.meuForm.value).subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
  }

  onExcluir(): void {
    this.servico.deleteCliente(this.id).subscribe(
      retorno => this.router.navigate(['/clientes'])
    );
  }

  onCancelar(): void {
    this.router.navigate(['/clientes']);
  }

}
