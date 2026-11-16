import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faFilm, faHeart, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { WishListService } from '../../services/wish-list.service';

const imageUrl = (path: string | null, size: string): string =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : '';

type SortKey = 'added' | 'title' | 'rating' | 'release';

@Component({
  selector: 'app-wish-list',
  imports: [DatePipe, DecimalPipe, FontAwesomeModule, RouterLink],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList {
  readonly wish = inject(WishListService);

  readonly faArrowLeft = faArrowLeft;
  readonly faFilm = faFilm;
  readonly faHeart = faHeart;
  readonly faStar = faStar;
  readonly faTrashCan = faTrashCan;

  readonly sortBy = signal<SortKey>('added');

  readonly sorted = computed(() => {
    const list = [...this.wish.movies()];
    switch (this.sortBy()) {
      case 'title':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return list.sort((a, b) => b.vote_average - a.vote_average);
      case 'release':
        return list.sort((a, b) => (b.release_date ?? '').localeCompare(a.release_date ?? ''));
      default:
        return list;
    }
  });

  readonly posterUrl = (path: string | null) => imageUrl(path, 'w342');

  onSortChange(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as SortKey);
  }

  clearAll(): void {
    if (window.confirm('Remove every movie from your wish list?')) {
      this.wish.clear();
    }
  }
}