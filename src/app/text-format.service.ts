import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TextFormatService {
  processTextWithLinks(text: string): string {
    if (!text) return '';
    const urlRegex = /(https?:\/\/[^\s<>]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" class="inline-link">$1</a>');
  }
}
