import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../common/models/pokemon";
import { Router } from "@angular/router";
import { PokemonService } from "../common/services/pokemon.service";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) {}
  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((pokemonList) => {
      console.log(pokemonList);
      this.pokemonList = pokemonList;
    });
  }

  detailPokemon(pokemonId: number) {
    this.router.navigate([`/pokemons/${+pokemonId}`]);
    console.table(this.pokemonService.getPokemonTypeList());
  }
}
