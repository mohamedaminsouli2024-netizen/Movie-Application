import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../intefaces/movie';
import { WishListService } from '../../services/wish-list.service';
import { imageUrl } from '../../utils/image';

@Component({
  selector: 'app-movie-search',
  imports: [DecimalPipe, FontAwesomeModule, RouterLink],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.css',
})
export class MovieSearch {
  readonly movies = input.required<Movie[]>();
  readonly wish = inject(WishListService);

  readonly faHeart = faHeart;
  readonly faFilm = faFilm;
  readonly faStar = faStar;

  readonly posterUrl = (path: string | null) => imageUrl(path, 'w342');
}