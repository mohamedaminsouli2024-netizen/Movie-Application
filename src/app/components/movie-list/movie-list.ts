import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../intefaces/movie';
import { SearchBar } from '../search-bar/search-bar';
import { MovieSearch } from '../movie-search/movie-search';

@Component({
  selector: 'app-movie-list',
  imports: [FontAwesomeModule, SearchBar, MovieSearch],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnDestroy {
  private readonly movieService = inject(MovieService);
  private sub?: Subscription;

  readonly faCircleExclamation = faCircleExclamation;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly placeholders = Array.from({ length: 10 }, (_, i) => i);

  readonly movies = signal<Movie[]>([]);
  readonly title = signal('');
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly heading = computed(() =>
    this.title() ? `Results for "${this.title()}"` : 'Now playing'
  );

  constructor() {
    this.load(this.movieService.getMovieList());
  }

  /** Called by the search bar each time the user pauses typing. */
  onSearch(title: string): void {
    this.title.set(title);

    if (!title) {
      this.load(this.movieService.getMovieList());
      return;
    }
    this.load(this.movieService.getMovieByTitle(title));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private load(request$: Observable<Movie[]>): void {
    this.sub?.unsubscribe();
    this.loading.set(true);
    this.error.set(false);

    this.sub = request$.subscribe({
      next: movies => {
        this.movies.set(movies);
        this.loading.set(false);
      },
      error: () => {
        this.movies.set([]);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}