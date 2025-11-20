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
  // Formatowanie tekstu pod WhatsApp (markdown)
  formatTextForWhatsApp(text: string): string {
    if (!text) return '';
    return text
      .replace(/^\s+/gm, '')
      .replace(/\*_([^_*]+)_\*/g, '*_$1_*')
      .replace(/_\*([^*_]+)\*_/g, '_*$1*_')
      .replace(/\*([^*]+)\*/g, '*$1*')
      .replace(/_([^_]+)_/g, '_$1_')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/(\*Modlitwa:\*)/g, '\n🙏 $1')
      .replace(/(\*Dzień [^:]+:\*)/g, '📿 $1')
      .replace(/^"([^"]+)"$/gm, '_"$1"_');
  }

  // Proste formatowanie tekstu (np. nagłówki)
  whatsappFormatText(text: string): string {
    let formatted = text
      .replace(/\n\n/g, '\n')
      .replace(/^(Dzień \w+: .+)/gm, '*$1*')
      .replace(/_/g, '')
      .replace(/\n/g, '\n');
    return formatted;
  }

  // Kopiowanie tekstu + linku audio w formacie WhatsApp
  copyAudioTextToClipboard(links: SingleLink[], formatter?: any) {
    const textObj = links.find(l => l.type === 'opis' && l.text);
    const audioObj = links.find(l => l.type === 'audio' && l.url);
    let text = textObj?.text || '';
    let audioUrl = audioObj?.url || '';
    if (audioUrl && !/^https?:\/\//.test(audioUrl)) {
      audioUrl = window.location.origin + '/' + audioUrl.replace(/^\/*/, '');
    }
    // Użyj formattera jeśli przekazany, w przeciwnym razie domyślna metoda
    const formatFn = formatter ? formatter.formatForWhatsApp : this.whatsappFormatText;
    let whatsappText = audioUrl ? `${audioUrl.trim()}\n\n${formatFn(text)}` : formatFn(text);
    navigator.clipboard.writeText(whatsappText);
    alert(`✅ Skopiowano tekst oraz link audio do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
  }

  // Kopiowanie dowolnego tekstu do schowka z formatowaniem WhatsApp
  async copyTextToClipboard(text: string, linkItem?: any, formatter?: any) {
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
    const whatsappText = formatter ? formatter.formatForWhatsApp(cleanText) : this.formatTextForWhatsApp(cleanText);
    await navigator.clipboard.writeText(whatsappText);
    alert(`✅ Tekst został skopiowany do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
  }
}
