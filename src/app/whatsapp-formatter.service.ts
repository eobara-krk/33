import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppFormatterService {
  // Proste formatowanie tekstu pod WhatsApp (bez HTML)
  simpleFormatForWhatsApp(text: string): string {
    return text
      .replace(/\n\n/g, '\n') // uproszczenie akapitów
      .replace(/^(Dzień \w+: .+)/gm, '*$1*') // pogrubienie nagłówków
      .replace(/_/g, '') // usunięcie podkreśleń jeśli są
      .replace(/\n/g, '\n'); // zachowanie nowych linii
  }

  // Funkcja: konwertuje HTML na format WhatsApp
  formatForWhatsApp(inputHtml: string): string {
    // Zamień <br> na \n
    let text = inputHtml.replace(/<br\s*\/?/gi, '\n');
    // Zamień <b>, <strong> na * (pogrubienie)
    text = text.replace(/<(b|strong)>(.*?)<\/(b|strong)>/gi, '*$2*');
    // Zamień <i>, <em> na _ (kursywa)
    text = text.replace(/<(i|em)>(.*?)<\/(i|em)>/gi, '_$2_');

    // Zamień linki <a href="..."> na czysty URL
    text = text.replace(/<a [^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi, '$1');

    // Usuń pozostałe znaczniki HTML
    text = text.replace(/<[^>]+>/g, '');
    // Usuń pozostałe znaki < i >, które mogły pozostać po usuwaniu tagów
    text = text.replace(/[<>]/g, '');

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