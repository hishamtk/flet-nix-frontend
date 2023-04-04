import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MovieApi } from '../movie-board/movie-board.component';
import { Login } from '../login/login.component';
import { SignUp } from '../signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getMovies(
    sort: string,
    order: SortDirection,
    page: number,
    search: string,
    type:string
  ): Observable<MovieApi> {
    const href = 'http://localhost:9000/api/movie/all';
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${
      page + 1
    }&search=${search}&type=${type}`;
    return this.http.get<MovieApi>(requestUrl);
  }

  getOneMovie(id: string): Observable<any> {
    const requestUrl = `http://localhost:9000/api/movie/${id}`;

    return this.http.get<any>(requestUrl);
  }

  signUp(data: SignUp) {
    return this.http.post<any>('http://localhost:9000/api/auth/signup', data);
  }

  login(data: Login) {
    return this.http.post<any>('http://localhost:9000/api/auth/login', data);
  }
}
