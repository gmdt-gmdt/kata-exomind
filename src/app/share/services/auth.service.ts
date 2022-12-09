import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Role } from "../enum/role";
import { Login, User } from "../../user/common/models/user.model";
import { UserService } from "../../user/common/services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  redirectUrl: string;

  constructor(private userService: UserService) {}

  login(userToLogin: Login): Observable<boolean> {
    const users$ = this.userService.searchUserList(userToLogin);
    //update isAdmin
    users$.subscribe(
      (users) =>
        (this.isAdmin = users.length > 0 && users[0].role === Role.Admin)
    );
    return users$.pipe(
      map((users: User[]) => users.length > 0),
      tap((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      })
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
