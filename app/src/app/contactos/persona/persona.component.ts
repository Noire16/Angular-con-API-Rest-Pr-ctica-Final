import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { PersonaModelo } from 'src/app/interfaces/PersonaModelo';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})


export class PersonaComponent implements OnInit {

  do:string= "insertar";
  position:any = 0;

  contactos: Array<PersonaModelo> =[];
  contacto: PersonaModelo;
  accion: string='Insertar'


  constructor(
    private http: HttpClient) {
    this.contacto = new PersonaModelo
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/personas').subscribe((data: any)=>{
      this.contactos= data
    })
  }

  add( form : NgForm ){
    if( this.do === 'insertar' ){

      let ageNumber = parseInt(this.contacto.age)

      let DNI = (<HTMLInputElement>document.getElementById("dni")).value
      var regularExpresion= /^\d{8}[a-zA-Z]{1}$/ 

      if(regularExpresion.test(DNI)==true && ageNumber > 0 && ageNumber <= 125 && this.contacto.name.length>=3 && this.contacto.surnames.length>=3 && this.contacto.favouriteColour.length>=3){
        let _that= this
        this.http.post('http://localhost:5000/personas', this.contacto).subscribe((res)=>{
          this.http.get('http://localhost:5000/personas').subscribe((data:any)=>{
            _that.contactos= data
          })
        })
        this.contactos.push( this.contacto )
      }
  
    }else{
      this.contactos[ this.position ] = this.contacto
      this.do = 'insertar'
    }
    form.resetForm();
    }
  
  
  deleteContacto(id:string){
    let _that = this
    this.http.delete(`http://localhost:5000/personas/${id}`).subscribe((res)=>{
      this.http.get('http://localhost:5000/personas').subscribe((data: any)=>{
        _that.contactos= data
      })
    })
  }

  editarContacto(id:string){
    this.accion = 'actualizar'
    this.http.get(`http://localhost:5000/personas/${id}`).subscribe( (res: any) => {
      this.contacto = res 
    })
  }

  actualizarContacto(_id:string){
    let _that = this
    this.do = 'updateOne'
    this.http.put(`http://localhost:5000/personas/${this.contacto._id}`, this.contacto).subscribe(( res )=>{
      this.http.get(`http://localhost:5000/personas`).subscribe(( data: any)=>{
      _that.contactos = data 
    })
    })
    this.contacto = new PersonaModelo()
  }
}