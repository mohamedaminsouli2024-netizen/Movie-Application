import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../intefaces/movie';
import { MovieResponse } from '../intefaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.url_api;
  private readonly key = environment.api_key;

  getMovieList(): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.key)
      .set('language', 'en-US')
      .set('page', '1');

    return this.http.get<MovieResponse>(`${this.url}/movie/now_playing`, { params }).pipe(
      map(response => response.results)
    );
  }

  getMovieByTitle(title: string): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.key)
      .set('query', title)
      .set('language', 'en-US')
      .set('page', '1');

    return this.http.get<MovieResponse>(`${this.url}/search/movie`, { params }).pipe(
      map(response => response.results)
    );
  }

  getMovieById(id: number): Observable<Movie> {
    const params = new HttpParams()
      .set('api_key', this.key)
      .set('language', 'en-US');

    return this.http.get<Movie>(`${this.url}/movie/${id}`, { params });
  }
}