import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[]= [];
  cargando= false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.cargando= true;
    this.heroesService.getHeroes().subscribe(resp => {
      this.heroes= resp;
      this.cargando= false;
    });
  }

  borrarHero(hero: HeroeModel, i: number){

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Está seguro que desea borrar a ${hero.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      //Si la respuesta es true entonces borra el registro
      if(resp.value){
      this.heroes.splice(i, 1);
      this.heroesService.borrarHero(hero.id).subscribe();
    }
  });
  }
}
