import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppFormatterService {

  // Funkcja: konwertuje HTML na format WhatsApp
  formatForWhatsApp(inputHtml: string): string {
    // Zamień <br> na \n
    let text = inputHtml.replace(/<br\s*\/?>/gi, '\n');
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
      // Łamanie linii na spacjach do 80 znaków, nie dziel formatowania
      while (line.length > 80) {
        let boldStart = line.startsWith('**');
        let italicStart = line.startsWith('_');

        let breakPos = line.lastIndexOf(' ', 80);
        if (breakPos === -1) breakPos = 80;
        let part = line.slice(0, breakPos);
        let rest = line.slice(breakPos).trimStart();

        // Jeśli part zaczyna się od **, musi też kończyć się na ** w tej samej linii
        if (boldStart && !part.endsWith('**')) {
          let nextBold = part.lastIndexOf('**');
          if (nextBold > 0) {
            breakPos = nextBold + 2;
            part = line.slice(0, breakPos);
            rest = line.slice(breakPos).trimStart();
          } else {
            break;
          }
        }
        // Analogicznie dla kursywy
        if (italicStart && !part.endsWith('_')) {
          let nextItalic = part.lastIndexOf('_');
          if (nextItalic > 0) {
            breakPos = nextItalic + 1;
            part = line.slice(0, breakPos);
            rest = line.slice(breakPos).trimStart();
          } else {
            break;
          }
        }
        // Usuń spację przed końcowym podkreśleniem w kursywie
        if (part.endsWith(' _')) {
          part = part.slice(0, -2) + '_';
        }
        result.push(part);
        line = rest;
      }
      // Usuń spację przed końcowym podkreśleniem w kursywie
      if (line.endsWith(' _')) {
        line = line.slice(0, -2) + '_';
      }
      result.push(line);
    }
    return result.join('\n');
  }
}