// whatsapp-format.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WhatsAppFormatService {
  formatForWhatsApp(text: string): string {
    let formatted = text
      .replace(/\n\n/g, '\n')
      .replace(/^(Dzień \w+: .+)/gm, '*$1*')
      .replace(/_/g, '')
      .replace(/\n/g, '\n');
    return formatted;
  }
}
