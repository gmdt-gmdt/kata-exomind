import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";

const NAME = "pikachu";
const PASSWORD = "pikachu";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor() {}

  login(name: string, password: string): Observable<boolean> {
    return of(name === NAME && password === PASSWORD).pipe(
      delay(1000),
      tap((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn))
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
