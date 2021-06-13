import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PersonaModelo } from '../interfaces/PersonaModelo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private ContactosUrl = 'http:localhost:5000/personas';

  constructor(private http: HttpClient) {}

  public getContactos(): Observable <Array<PersonaModelo>>{
    return this.http.get<Array<PersonaModelo>>(this.ContactosUrl);
  }

  public actualizarContacto(contacto: PersonaModelo): Observable<any>{
    return this.http.put(`${this.ContactosUrl}/${contacto._id}`, contacto);
  }

  public crearContacto(contacto: PersonaModelo): Observable<PersonaModelo>{
    return this.http.post<PersonaModelo>(this.ContactosUrl, contacto);
  }

  public borrarContacto(contacto: PersonaModelo): Observable<any> {
    return this.http.delete(`${this.ContactosUrl}/${contacto._id}`);
  }
}

