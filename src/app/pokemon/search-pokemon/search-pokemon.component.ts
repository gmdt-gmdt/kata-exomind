import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  takeWhile,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { Pokemon } from "../common/models/pokemon";
import { PokemonService } from "../common/services/pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
  styles: [],
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;
  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(criteria: string) {
    this.searchTerms.next(criteria);
  }

  goToDetailPokemon(id: number) {
    this.router.navigate(["pokemons/", id]);
  }
}
