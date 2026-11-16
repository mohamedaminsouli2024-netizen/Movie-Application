import { environment } from '../../environments/environment';

export type ImageSize = 'w185' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original';

/** Builds a TMDB image URL, or null when the movie has no image. */
export function imageUrl(path: string | null | undefined, size: ImageSize = 'w500'): string | null {
  return path ? `${environment.url_image}${size}${path}` : null;
}