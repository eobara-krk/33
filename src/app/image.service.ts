import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageService {
  toggleFullscreen(current: string | null, url?: string): string | null {
    if (url) {
      return current === url ? null : url;
    } else {
      return null;
    }
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    console.log('Obrazek załadowany:', img.src);
    img.style.opacity = '1';
    img.classList.add('loaded');
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '0.5';
    img.classList.add('error');
    console.warn('Błąd ładowania obrazka:', img.src);
  }

  hasPhotoElements(links: any[]): boolean {
    return links && links.some(link => link.type === 'foto');
  }
}
