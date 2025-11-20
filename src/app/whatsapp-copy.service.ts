// Minimalna definicja typu SingleLink
export interface SingleLink {
  url?: string;
  type?: string;
  label?: string;
  fullscreen?: boolean;
  image?: string;
  name?: string;
  show?: boolean;
  links?: SingleLink[];
  text?: string;
  hidden?: boolean;
}
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WhatsappCopyService {

  // Kopiowanie tekstu + linku audio w formacie WhatsApp
  async copyAudioTextToClipboard(links: SingleLink[], formatter: { formatForWhatsApp: (text: string) => string }) {
    const textObj = links.find(l => l.type === 'opis' && l.text);
    const audioObj = links.find(l => l.type === 'audio' && l.url);
    let text = textObj?.text || '';
    let audioUrl = audioObj?.url || '';
    if (audioUrl && !/^https?:\/\//.test(audioUrl)) {
      audioUrl = window.location.origin + '/' + audioUrl.replace(/^\/*/, '');
    }
    // Użyj zawsze formattera przekazanego z WhatsAppFormatterService
    let whatsappText = audioUrl ? `${audioUrl.trim()}\n\n${formatter.formatForWhatsApp(text)}` : formatter.formatForWhatsApp(text);
    try {
      await navigator.clipboard.writeText('');
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (clearError) {
      // ignore
    }
    await navigator.clipboard.writeText(whatsappText);
    if (audioUrl) {
      alert(`✅ Skopiowano tekst oraz link audio do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
    } else {
      alert(`✅ Skopiowano tekst do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
    }
  }

}
