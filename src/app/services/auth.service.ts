import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Login } from '../login/login.component';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'fletNix auth';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  constructor(private api: ApiService) {
    const token = localStorage.getItem(this.TOKEN_NAME);
    //check the token expiry here if needed.
    this._isLoggedIn$.next(!!token);
  }

  login(data: Login) {
    return this.api.login(data).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_NAME, res.token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout(){
    localStorage.removeItem(this.TOKEN_NAME);
    return true;
  }
}
