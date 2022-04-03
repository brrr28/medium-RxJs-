import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {AuthResponceInterface} from '../types/ registerResponce.interface';
import {LoginRequestInterface} from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponceInterface>(`${this.baseUrl}/users`, data)
      .pipe(map((data: AuthResponceInterface) => data.user));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponceInterface>(`${this.baseUrl}/users/login`, data)
      .pipe(map((data: AuthResponceInterface) => data.user));
  }
}
