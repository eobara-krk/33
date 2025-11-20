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
  copyAudioTextToClipboard(links: SingleLink[], formatter: { formatForWhatsApp: (text: string) => string }) {
    const textObj = links.find(l => l.type === 'opis' && l.text);
    const audioObj = links.find(l => l.type === 'audio' && l.url);
    let text = textObj?.text || '';
    let audioUrl = audioObj?.url || '';
    if (audioUrl && !/^https?:\/\//.test(audioUrl)) {
      audioUrl = window.location.origin + '/' + audioUrl.replace(/^\/*/, '');
    }
    // Użyj zawsze formattera przekazanego z WhatsAppFormatterService
    let whatsappText = audioUrl ? `${audioUrl.trim()}\n\n${formatter.formatForWhatsApp(text)}` : formatter.formatForWhatsApp(text);
    navigator.clipboard.writeText(whatsappText);
    alert(`✅ Skopiowano tekst oraz link audio do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
  }

  // Kopiowanie dowolnego tekstu do schowka z formatowaniem WhatsApp
  async copyTextToClipboard(formatter: { formatForWhatsApp: (text: string) => string }, text: string, linkItem?: any) {
    if (!text) {
      alert('Brak tekstu do skopiowania.');
      return;
    }
    try {
      await navigator.clipboard.writeText('');
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (clearError) {
      // ignore
    }
    const sourceMatch = text.match(/\s*Źródło:\s+(https?:\/\/[^\s<>]+)/);
    const sourceUrl = sourceMatch ? sourceMatch[1] : null;
    let cleanText = text.replace(/\s*Źródło:\s+https?:\/\/[^\s<>]+/g, '');
    if (linkItem && linkItem.type === 'audio' && linkItem.url) {
      cleanText += `\n${linkItem.url}`;
    }
    const whatsappText = formatter.formatForWhatsApp(cleanText);
    await navigator.clipboard.writeText(whatsappText);
    alert(`✅ Tekst został skopiowany do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
  }
}
