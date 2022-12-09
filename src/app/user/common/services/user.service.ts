import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, of } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      tap((userList) => this.log(userList)),
      catchError((error) => this.handleError(error, []))
    );
  }

  searchUserList(criteria: Partial<User>): Observable<User[]> {
    const queryParamsString = new HttpParams({
      fromObject: criteria,
    }).toString();
    return criteria
      ? this.http
          .get<User[]>(`${environment.apiUrl}/users?${queryParamsString}`)
          .pipe(
            tap((userList) => this.log(userList)),
            catchError((error) => this.handleError(error, []))
          )
      : of([]);
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`).pipe(
      tap((user) => this.log(user)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${environment.apiUrl}/users/${user.id}`, user)
      .pipe(
        tap((data) => this.log(data)),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  addUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${environment.apiUrl}/users`, user).pipe(
      tap((data) => this.log(data)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  deleUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/Users/${userId}`).pipe(
      tap((data) => this.log(data)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  private log(response: User[] | User | undefined) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
