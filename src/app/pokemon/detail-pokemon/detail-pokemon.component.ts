import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../common/models/pokemon";
import { PokemonService } from "../common/services/pokemon.service";
import { AuthService } from "src/app/share/services/auth.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styles: [],
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
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
    if (this.authService.isAdmin && confirm("Are you sure you want to delete"))
      this.pokemonService
        .delePokemon(id)
        .subscribe(() => this.router.navigate(["pokemons"]));
  }
}
