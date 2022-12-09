import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";
import { RouterModule, Routes } from "@angular/router";
import { PokemonService } from "./common/services/pokemon.service";
import { FormsModule } from "@angular/forms";
import { PokemonFormComponent } from "./pokemon-form/pokemon-form.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { AddPokemonComponent } from "./add-pokemon/add-pokemon.component";
import { SearchPokemonComponent } from "./search-pokemon/search-pokemon.component";
import { LoaderComponent } from "./loader/loader.component";
import { AuthGuard } from "../share/guards/auth.guard";
import { BorderCardDirective } from "./common/directives/border-card.directive";
import { PokemonTypeColorPipe } from "./common/pipes/pokemon-type-color.pipe";
import { AdminGuard } from "../share/guards/admin.guard";

const pokemonRoutes: Routes = [
  {
    path: "pokemons",
    component: ListPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemons/:id",
    component: DetailPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/pokemon/:id",
    component: EditPokemonComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "pokemon/add",
    component: AddPokemonComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "",
    redirectTo: "pokemons",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    BorderCardDirective,
    PokemonTypeColorPipe,
    ListPokemonComponent,
    DetailPokemonComponent,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)],
  providers: [PokemonService],
})
export class PokemonModule {}
