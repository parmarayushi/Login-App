import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiLlink: string;
  constructor(private _http: HttpClient) {
    this.apiLlink = environment.baseUrl;
  }

  public addUser(form: User): Observable<User[]> {
    return this._http.post<User[]>(`${this.apiLlink}/users`, form);
  }

  public confirmPassword(password: AbstractControl): { passwordsDoNotMatch: boolean; } | null {
    return password.get('password')?.value !== password.get('confirmPassword')?.value
      ? { passwordsDoNotMatch: true }
      : null;
  }
}
