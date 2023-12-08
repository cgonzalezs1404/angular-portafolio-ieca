import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { lastValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  appName: string = 'fundamentals-app';
  angularLogo: string = "https://angular.io/assets/images/logos/angular/angular.svg"

  btnDisabled: boolean = true
  email: string = "edu@eml.run"

  constructor(private http: HttpClient) { }

  mostrarAlerta() {
    alert("Alerta ⚠️")
  }

  contadorOvejas: number = 0

  contarOveja() {
    this.contadorOvejas += 1
  }

  establecerOvejas(event: Event) {
    const element = event.target as HTMLInputElement;

    try {
      const numeroOvejas: number = parseInt(element.value);
      if (numeroOvejas > 0) {
        this.contadorOvejas = numeroOvejas;
      }
    } catch {
      console.log('No es un número');
    }
  }

  persona: any = {
    nombre: ''
  }

  listaPersonas: string[] = []

  agregarPersona(): void {
    this.listaPersonas.push(this.persona.nombre)
    this.persona.nombre = ''
  }

  borrarPersona(index: number): void {
    this.listaPersonas.splice(index, 1)
  }

  miPokedex: Pokemon[] = [];

  async ngOnInit(): Promise<void> {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${Math.floor(Math.random() * 501)}`;
    var result = await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp: any) => { return resp }))).then((res) => res).catch((err) => err);

        /*
    AQUÍ PUEDES CONTINUAR CON EL EJERCICIO PARA OBTENER LA IMAGEN DEL POKÉMON
      -> Recuerda revisar el API de https://pokeapi.co/ <-
    */
   
    if (result.status === 200) {

      this.miPokedex = result.body.results;
      for(let i=0; i<this.miPokedex.length; i++){
        var pokeResult = await lastValueFrom(this.http.get(this.miPokedex[i].url, {observe: 'response'}).pipe(map((resp: any) => {return resp}))).then((res) => res).catch((err) => err);
        this.miPokedex[i].image = pokeResult.body.sprites.front_default;
      }

    }
    console.log(this.miPokedex);
  }

  nuevoPokemon: string = "";


}
