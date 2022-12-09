import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../common/models/pokemon";
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from "../common/services/pokemon.service";

@Component({
  selector: "app-edit-pokemon",
  templateUrl: `./edit-pokemon.component.html`,
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const pokemonId: number = +this.route.snapshot.params["id"];
    this.pokemonService
      .getPokemonById(pokemonId)
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }
}
