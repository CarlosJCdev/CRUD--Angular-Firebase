import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url= 'https://crud-angular-9f4e4.firebaseio.com';

  constructor(private http: HttpClient) {
   }

   crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe ).pipe(
      map((resp: any) =>{
        heroe.id= resp.name;
        return heroe;
      })
    );
   }



   //Heroe tiene los valores del nombre, el poder, y el estado
   //Para actualizar solo necesitamos pasar el nombre, poder, y el estado, se debe quitar el atributo de ID
   actualizarHeroe(heroe: HeroeModel){
     const heroenoID={
       //Con el operador spreat, tomas todas las propiedades del objeto heroe y crea una nueva propiedad con el mismo nombre
       ...heroe
     };
     //Ahora simplemente elimino el atributo ID del objeto heronoID
     delete heroenoID.id;
     return this.http.put(`${this.url}/heroes/${ heroe.id}.json`, heroenoID);
   }



   //No pasamos argumentos, por que necesitamos todos los datos del objeto
   /*Para poder mostrar los registros de firebase, debemos convertir la respuesta que nos 
   arroja firebase, por que esté es un objeto complejo el cual no podemos iterar en un ngFor
   por ello debemos convertirlo en un arreglo o una colección de arreglos */
   getHeroes(){
      return this.http.get(`${this.url}/heroes.json`).pipe(
        map( this.crearArreglo), 
        delay(1500)
      );
   }
   //Creo un metodo privado, para no ponerlo en el método getHeroes y se pueda acceder a el
   private crearArreglo(heroesObj: Object){
    const heroes: HeroeModel[]= [];
    Object.keys(heroesObj).forEach(key =>{
      const heroe: HeroeModel= heroesObj[key];
      heroe.id = key;
      heroes.push( heroe);
    });
    return heroes;
   }



   getHero(id: string){
     return this.http.get(`${this.url}/heroes/${id}.json`);
   }

   
   
   borrarHero(id: string){
     return this.http.delete(`${this.url}/heroes/${id}.json`);
   }
}
