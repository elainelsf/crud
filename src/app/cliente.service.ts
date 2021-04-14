import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:3000/clientes');
  }

  getClienteById(id: string): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:3000/clientes/' + id);
  }

  updateCliente(id: string, cliente: any): Observable<Cliente>{
    return this.http.put<Cliente>('http://localhost:3000/clientes/' + id, cliente);
  }

  addCliente(cliente: any): Observable<Cliente>{
    return this.http.post<Cliente>('http://localhost:3000/clientes/', cliente);
  }

  deleteCliente(id: string): Observable<Cliente>{
    return this.http.delete<Cliente>('http://localhost:3000/clientes/' + id);
  }
}
