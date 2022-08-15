import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  message: string = "you are connected";
  name: string;
  password: string;
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  setMessage() {
    this.message = this.authService.isLoggedIn
      ? "connected"
      : "Login/password invalid";
  }

  login() {
    this.message = "Tentative de connexion...";
    this.authService.login(this.name, this.password).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.setMessage();
      if (this.authService.isLoggedIn) this.router.navigate(["/pokemons"]);
    });
  }
  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.setMessage();
  }
}
