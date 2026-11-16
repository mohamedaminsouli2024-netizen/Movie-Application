import { Injectable, computed, signal } from '@angular/core';
import { Movie } from '../intefaces/movie';

const STORAGE_KEY = 'movie-app-wish-list';

@Injectable({ providedIn: 'root' })
export class WishListService {
  private readonly _movies = signal<Movie[]>(this.load());
  readonly movies = this._movies.asReadonly();
  readonly count = computed(() => this._movies().length);

  has(id: number): boolean {
    return this._movies().some(m => m.id === id);
  }

  toggle(movie: Movie): void {
    if (this.has(movie.id)) {
      this.remove(movie.id);
    } else {
      this.save([...this._movies(), movie]);
    }
  }

  remove(id: number): void {
    this.save(this._movies().filter(m => m.id !== id));
  }

  private save(movies: Movie[]): void {
    this._movies.set(movies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }

  private load(): Movie[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}