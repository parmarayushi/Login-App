import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiLink: string;
  public validUser: any;

  constructor(private _http: HttpClient) {
    this.apiLink = environment.baseUrl;
  }

  public getUser(): Observable<Users[]> {
    return this._http.get<Users[]>(`${this.apiLink}/users`);
  }

  public isLoggedIn() {
    return this.validUser ? true : false;
  }
}
