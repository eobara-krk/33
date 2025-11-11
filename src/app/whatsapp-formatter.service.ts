import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppFormatterService {

  // Funkcja: konwertuje HTML na format WhatsApp
  formatForWhatsApp(inputHtml: string): string {
    // Zamień <br> na \n
  let text = inputHtml.replace(/<br\s*\/?/gi, '\n');
    // Zamień <b>, <strong> na * (pogrubienie)
    text = text.replace(/<(b|strong)>(.*?)<\/(b|strong)>/gi, '*$2*');
    // Zamień <i>, <em> na _ (kursywa)
    text = text.replace(/<(i|em)>(.*?)<\/(i|em)>/gi, '_$2_');
    // Usuń pozostałe znaczniki HTML
    text = text.replace(/<[^>]+>/g, '');

    // Zachowaj puste linie
    const lines = text.split(/\n/);
    const result: string[] = [];
    for (let line of lines) {
      line = line.trim();
      if (!line) {
        result.push('');
        continue;
      }
      // Usuń spację przed końcowym podkreśleniem w kursywie
      if (line.endsWith(' _')) {
        line = line.slice(0, -2) + '_';
      }
      // Usuń spację przed końcową gwiazdką w pogrubieniu
      if (line.endsWith(' *')) {
        line = line.slice(0, -2) + '*';
      }
      result.push(line);
    }
    return result.join('\n');
  }
}