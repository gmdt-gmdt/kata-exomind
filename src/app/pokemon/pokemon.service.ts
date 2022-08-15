import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemon-list";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${environment.apiUrl}/pokemons`).pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    );
  }

  searchPokemonList(criteria: string): Observable<Pokemon[]> {
    return criteria && criteria.length > 1
      ? this.http
          .get<Pokemon[]>(
            `${environment.apiUrl}/pokemons/search?name=${criteria}`
          )
          .pipe(
            tap((pokemonList) => this.log(pokemonList)),
            catchError((error) => this.handleError(error, []))
          )
      : of([]);
  }

  getPokemonById(id: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${environment.apiUrl}/pokemons/${id}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .put<Pokemon>(`${environment.apiUrl}/pokemons/${pokemon.id}`, pokemon)
      .pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    console.log(pokemon);
    return this.http
      .post<Pokemon>(`${environment.apiUrl}/pokemons`, pokemon)
      .pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  delePokemon(pokemonId: number): Observable<Pokemon> {
    return this.http
      .delete<Pokemon>(`${environment.apiUrl}/pokemons/${pokemonId}`)
      .pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  private log(response: Pokemon[] | Pokemon | undefined) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    const types: string[] = [];
    POKEMONS.map((p: Pokemon) => {
      p.types.forEach((t) => {
        if (!types.includes(t)) {
          types.push(t);
        }
      });
    });
    return types;
  }
}
