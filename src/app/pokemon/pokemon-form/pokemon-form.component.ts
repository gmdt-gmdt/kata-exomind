import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "../common/models/pokemon";
import { PokemonService } from "../common/services/pokemon.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;
  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes("add");
    this.types = this.pokemonService.getPokemonTypeList();
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string): void {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }
  isTypesValid(type: string): boolean {
    const len: number = this.pokemon.types.length;

    if (len === 1 && this.hasType(type)) {
      return false;
    }
    if (len > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon).subscribe(
        (data) => this.goDetail(data.id),
        (error) => console.error(error)
      );
    } else {
      this.pokemonService
        .updatePokemon(this.pokemon)
        .subscribe(() => this.goDetail(this.pokemon.id));
    }
  }

  goDetail(id: number) {
    this.router.navigate(["/pokemons", id]);
  }
}
