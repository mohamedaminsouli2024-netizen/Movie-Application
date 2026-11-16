import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm, faHeart } from '@fortawesome/free-solid-svg-icons';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-head-bar',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css',
})
export class HeadBar {
  readonly faHeart = faHeart;
  readonly faFilm = faFilm;
  readonly wish = inject(WishListService);
}