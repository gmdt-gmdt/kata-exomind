import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { POKEMONS } from "../mock-pokemon-list";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styles: [],
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonId: number = +this.route.snapshot.params["id"];
    this.pokemonService
      .getPokemonById(pokemonId)
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  goBack() {
    this.router.navigate([""]);
  }
  goToEditPokemon(id: number) {
    this.router.navigate(["edit/pokemon", id]);
  }
  deletePokemon(id: number) {
    this.pokemonService
      .delePokemon(id)
      .subscribe(() => this.router.navigate(["pokemons"]));
  }
}
