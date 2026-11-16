import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faCircleExclamation,
  faFilm,
  faHeart,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { WishListService } from '../../services/wish-list.service';
import { Movie } from '../../intefaces/movie';
import { imageUrl } from '../../utils/image';

@Component({
  selector: 'app-movie-detail',
  imports: [DatePipe, DecimalPipe, FontAwesomeModule, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);
  readonly wish = inject(WishListService);

  readonly faArrowLeft = faArrowLeft;
  readonly faCircleExclamation = faCircleExclamation;
  readonly faFilm = faFilm;
  readonly faHeart = faHeart;
  readonly faStar = faStar;

  readonly movie = signal<Movie | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly wished = computed(() => {
    const movie = this.movie();
    return movie !== null && this.wish.has(movie.id);
  });
  readonly poster = computed(() => imageUrl(this.movie()?.poster_path, 'w500'));
  readonly backdrop = computed(() => imageUrl(this.movie()?.backdrop_path, 'w1280'));

  constructor() {
    this.route.paramMap
      .pipe(
        map(params => Number(params.get('id'))),
        tap(() => {
          this.loading.set(true);
          this.error.set(false);
          this.movie.set(null);
        }),
        switchMap(id =>
          this.movieService.getMovieById(id).pipe(
            catchError(() => {
              this.error.set(true);
              this.loading.set(false);
              return EMPTY;
            })
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe(movie => {
        this.movie.set(movie);
        this.loading.set(false);
      });
  }

  toggleWish(): void {
    const movie = this.movie();
    if (movie) {
      this.wish.toggle(movie);
    }
  }
}