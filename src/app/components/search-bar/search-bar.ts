import { Component, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faXmark = faXmark;

  /** Emits the trimmed title once the user pauses typing. */
  readonly titleChange = output<string>();

  readonly hasText = signal(false);
  private readonly searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms
      .pipe(
        map(term => term.trim()),
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe(title => this.titleChange.emit(title));
  }

  onInput(value: string): void {
    this.hasText.set(value.trim().length > 0);
    this.searchTerms.next(value);
  }

  clear(input: HTMLInputElement): void {
    if (!this.hasText() && input.value === '') {
      return;
    }
    input.value = '';
    this.hasText.set(false);
    this.searchTerms.next('');
    input.focus();
  }
}