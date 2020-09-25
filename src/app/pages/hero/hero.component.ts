import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  heroe= new HeroeModel();
  forma: FormGroup;

  constructor(private fb: FormBuilder, private heroeService: HeroesService, private route: ActivatedRoute) { 
  this.crearFormulario();
  }

  ngOnInit(){
    // Nos subscribimos a los cambios de la ruta id, esta es una alternativa a subscribe
    const id= this.route.snapshot.paramMap.get('id');
    if( id !== 'nuevo'){
      this.heroeService.getHero(id).subscribe((resp: HeroeModel) =>{
        this.heroe= resp;
        console.log(this.heroe);
        this.heroe.id= id;
      });
    }
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get poderNoValido(){
    return this.forma.get('poder').invalid && this.forma.get('poder').touched
  }

  crearFormulario(){
    this.forma= this.fb.group({
      nombre: ['', Validators.required],
      poder: ['', Validators.required]
    })
  }


  guardar(form: NgForm){
    if(form.invalid){
      console.log('Formulario no valido');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    //Si el heroe id es diferente de nulo, osea tiene info se actualiza,
    //Si no entonces se creará un nuevo registro
    if(this.heroe.id){
    peticion=  this.heroeService.actualizarHeroe(this.heroe);
    }else{
     peticion=  this.heroeService.crearHeroe(this.heroe);
     /* this.forma.reset(); */
    }
    peticion.subscribe(resp =>{
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });
  } 
}
