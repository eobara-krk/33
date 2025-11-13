// Kopiowanie tekstu audio wraz z linkiem do schowka (dla przycisku przy audio)
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NovenaTexts } from './novena-texts';
import { TvelveDaysTexts } from './tvelvedays-texts'; 
import { FirstWeekTexts } from './firstWeek-texts';
import  {SecondWeekTexts } from './secondWeek-texts';
import {ThirdWeekTexts} from './thirdWeek-texts';  
import {OddanieTexts} from './oddanie-texts';
import { WhatsAppFormatterService } from './whatsapp-formatter.service';

// Typy dla linków i itemów
interface LinkGroup {
  name: string;
  show?: boolean;
  type?: string;         // opis, html, audio...
  links?: SingleLink[];  // <-- teraz można używać label
  text?: string;
  protected?: boolean;
  image?: string;  // opcjonalne pole na obrazek
  fullscreen?: boolean; 
  url?: string; // <-- dodajemy opcjonalne pole url
}
interface SingleLink {
  url?: string;
  type?: string;
  label?: string;  // <-- dodajemy opcjonalne pole label
  fullscreen?: boolean; // jeśli chcesz obsługiwać fullscreen dla linków
  image?: string; // 🆕 obrazek do wyświetlenia
  name?: string; // nazwa dla zagnieżdżonych grup
  show?: boolean; // czy grupa zagnieżdżona jest rozwinięta
  links?: SingleLink[]; // zagnieżdżone linki
  text?: string; // 🆕 tekst do wyświetlenia jako podlink
  hidden?: boolean; // ukrywa link w aplikacji
}

interface Meeting {
  date: string;
  show: boolean;
  links?: LinkGroup[];
  meetings?: Meeting[]; // dla spotkań z podziałem na daty
}

interface Item {
  title: string;
  show: boolean;
  image?: string;       // 🆕 obrazek JPG lub PNG
  fullscreen?: boolean; // 🆕 tryb pełnoekranowy po kliknięciu
 links?: LinkGroup[];
  meetings?: Meeting[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // <-- potrzebne do date pipe i dyrektyw typu ngSwitch
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

    currentDateTime: Date = new Date(); // data biezaca
    //currentDateTime: Date | null = new Date(2026, 10, 5); // (2025, 4, 2) = 2 maj


      // KONFIGURACJA DAT - tutaj ustawiasz datę startu
   
 get startDate(): Date {
    const today = this.currentDateTime ?? new Date();
    today.setHours(0,0,0,0);
    const year = today.getFullYear();
    const marzec20 = new Date(year, 2, 20); // 20 marca
    const maj10 = new Date(year, 4, 10); // 10 maja
    if (today > marzec20 && today < maj10) {
      return new Date(year, 2, 22); // 22 marca
    } else {
      return new Date(year, 9, 27); // 27 października
    }
  }

  
  // Zarządzanie odtwarzaniem lokalnych audio dla 12 dni
  // Player do lokalnego pliku mp3 (12 dni wprowadzenie)
  isLocalIntroAudioPlaying = false;
  localIntroAudioElement: HTMLAudioElement | null = null;
  private localIntroAudioUrl = 'assets/12dni/Droga_Maryi_12_dni_wprowadzenie.mp3';

  toggleLocalIntroAudio() {
    if (this.isLocalIntroAudioPlaying) {
      // Zatrzymaj lokalne audio
      this.localIntroAudioElement?.pause();
      this.localIntroAudioElement!.currentTime = 0;
      this.isLocalIntroAudioPlaying = false;
    } else {
      // Zatrzymaj inne audio
      this.stopAllAudio();
      if (!this.localIntroAudioElement) {
        this.localIntroAudioElement = new Audio(this.localIntroAudioUrl);
        this.localIntroAudioElement.volume = 0.8;
        this.localIntroAudioElement.addEventListener('ended', () => {
          this.isLocalIntroAudioPlaying = false;
        });
        this.localIntroAudioElement.addEventListener('error', (e) => {
          alert('Nie można odtworzyć pliku audio.');
          this.isLocalIntroAudioPlaying = false;
        });
      }
      this.localIntroAudioElement.play()
        .then(() => {
          this.isLocalIntroAudioPlaying = true;
        })
        .catch(() => {
          alert('Nie można odtworzyć pliku audio.');
          this.isLocalIntroAudioPlaying = false;
        });
    }
  }
  // Sprawdza czy w tablicy linków jest audio z url
  hasAudioLink(links: SingleLink[]): boolean {
    return Array.isArray(links) && links.some(x => x.type === 'audio' && !!x.url);
  }
  // Licznik dni do 8 grudnia lub 3 maja
  get daysToEnd(): string {
  const today = this.currentDateTime ?? new Date();
  today.setHours(0,0,0,0);
  const year = today.getMonth() > 10 ? today.getFullYear() + 1 : today.getFullYear();
  const marzec20 = new Date(year, 2, 20); // 20 marca
  const maj10 = new Date(year, 4, 10); // 10 maja
  let target: Date;
  let targetLabel: string;
  if (today > marzec20 && today < maj10) {
    target = new Date(year, 4, 3); // 3 maja
    targetLabel = '3 maja';
  } else {
    target = new Date(year, 11, 8); // 8 grudnia
    targetLabel = '8 grudnia';
  }
  const diff = target.getTime() - today.getTime();
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  const dniTxt = days === 1 ? 'dzień' : 'dni';
  const dniPozostałoTxt = days === 1 ? 'Pozostał' : 'Pozostało';
  return `Pozostało ${days} ${dniTxt} do ${targetLabel}!`;
  }
  // Pomocnicza metoda: wstawia datę z pola name na początek tekstu
  prependDateFromName(name: string, text: string): string {
    // Wyciągnij datę z pola name (po dwukropku i spacji)
    const match = name.match(/\d{2}: (.+)/);
    const date = match ? match[1] : name;
    return `<b>${date}</b><br>${text}`;
  }

  // Kopiowanie tekstu + linku audio w formacie WhatsApp
  copyAudioTextToClipboard(links: SingleLink[]) {
    const textObj = links.find(l => l.type === 'opis' && l.text);
    const audioObj = links.find(l => l.type === 'audio' && l.url);
    let text = textObj?.text || '';
    let audioUrl = audioObj?.url || '';
    // Upewnij się, że link audio jest pełnym URL-em
    if (audioUrl && !/^https?:\/\//.test(audioUrl)) {
      audioUrl = window.location.origin + '/' + audioUrl.replace(/^\/*/, '');
    }
    // Dodaj link audio na samą górę, potem pustą linię, potem tekst
    let whatsappText = audioUrl ? `${audioUrl.trim()}\n\n${this.whatsappFormatter.formatForWhatsApp(text)}` : this.whatsappFormatter.formatForWhatsApp(text);
  navigator.clipboard.writeText(whatsappText);
  alert(`✅ Skopiowano tekst oraz link audio do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
  }
  constructor(private whatsappFormatter: WhatsAppFormatterService) {}
  // Funkcja konwertująca tekst na format WhatsApp
  whatsappFormatText(text: string): string {
    // Przykład: zamiana podwójnych nowych linii na pojedyncze, dodanie gwiazdek do nagłówków
    let formatted = text
      .replace(/\n\n/g, '\n') // uproszczenie akapitów
      .replace(/^(Dzień \w+: .+)/gm, '*$1*') // pogrubienie nagłówków
      .replace(/_/g, '') // usunięcie podkreśleń jeśli są
      .replace(/\n/g, '\n'); // zachowanie nowych linii
    return formatted;
  }

readonly litania = NovenaTexts.litania;
readonly nowenna0 = NovenaTexts.dzien0;
readonly nowenna1 = NovenaTexts.dzien1;
readonly nowenna2 = NovenaTexts.dzien2;
readonly nowenna3 = NovenaTexts.dzien3;
readonly nowenna4 = NovenaTexts.dzien4;
readonly nowenna5 = NovenaTexts.dzien5;
readonly nowenna6 = NovenaTexts.dzien6;
readonly nowenna7 = NovenaTexts.dzien7  
readonly nowenna8 = NovenaTexts.dzien8;
readonly nowenna9 = NovenaTexts.dzien9;

readonly tvelveDay0 = TvelveDaysTexts.dzien0;
readonly tvelveDay1 = TvelveDaysTexts.dzien1;
readonly tvelveDay2 = TvelveDaysTexts.dzien2;
readonly tvelveDay3 = TvelveDaysTexts.dzien3;
readonly tvelveDay4 = TvelveDaysTexts.dzien4;
readonly tvelveDay5 = TvelveDaysTexts.dzien5;
readonly tvelveDay6 = TvelveDaysTexts.dzien6; 
readonly tvelveDay7 = TvelveDaysTexts.dzien7;
readonly tvelveDay8 = TvelveDaysTexts.dzien8;
readonly tvelveDay9 = TvelveDaysTexts.dzien9;
readonly tvelveDay10 = TvelveDaysTexts.dzien10;
readonly tvelveDay11 = TvelveDaysTexts.dzien11;
readonly tvelveDay12 = TvelveDaysTexts.dzien12;

readonly firstWeekDay1 = FirstWeekTexts.dzien1;
readonly firstWeekDay2 = FirstWeekTexts.dzien2;
readonly firstWeekDay3 = FirstWeekTexts.dzien3;
readonly firstWeekDay4 = FirstWeekTexts.dzien4;
readonly firstWeekDay5 = FirstWeekTexts.dzien5;
readonly firstWeekDay6 = FirstWeekTexts.dzien6;
readonly firstWeekDay7 = FirstWeekTexts.dzien7;

readonly secondWeekDay1 = SecondWeekTexts.dzien1;
readonly secondWeekDay2 = SecondWeekTexts.dzien2
readonly secondWeekDay3 = SecondWeekTexts.dzien3;
readonly secondWeekDay4 = SecondWeekTexts.dzien4;
readonly secondWeekDay5 = SecondWeekTexts.dzien5;
readonly secondWeekDay6 = SecondWeekTexts.dzien6;
readonly secondWeekDay7 = SecondWeekTexts.dzien7;

readonly thirdWeekDay1 = ThirdWeekTexts.dzien1;
readonly thirdWeekDay2 = ThirdWeekTexts.dzien2;
readonly thirdWeekDay3 = ThirdWeekTexts.dzien3;
readonly thirdWeekDay4 = ThirdWeekTexts.dzien4;
readonly thirdWeekDay5 = ThirdWeekTexts.dzien5;
readonly thirdWeekDay6 = ThirdWeekTexts.dzien6;
readonly thirdWeekDay7 = ThirdWeekTexts.dzien7;

readonly oddanieDayAkt = OddanieTexts.dzienAkt;
readonly oddanieDay0 = OddanieTexts.dzien0;

  // Przykład użycia przy kopiowaniu
  // Przykład: dynamiczne wyświetlanie tekstu z datą
  getDzien0TekstZData(): string {
    return `${this.getDatePlusDays(this.startDate, 0)}<br>${NovenaTexts.dzien0}`;
  }

  copyAsWhatsapp(text: string) {
    const formatted = this.whatsappFormatText(text);
    navigator.clipboard.writeText(formatted);
  }

  fullscreenImage: string | null = null; // <-- globalny fullscreen
  private hasScrolledToToday: boolean = false; // Flaga czy już przewinięto do dzisiejszej daty



  // Metoda pomocnicza do generowania nazwy dnia z datą
  private getDayName(date: Date): string {
    const dayNames = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${dayName} ${day}.${month}.${year} r.`;
  }

  // Metoda do generowania daty o N dni później
  getDatePlusDays(startDate: Date, days: number): string {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + days);
    return this.getDayName(newDate);
  }

items: Item[] = [
  { 
    title: 'Nowenna do św. Ludwika <br><b>27 X - 04 XI</b>', 
    show: false,
    links: [
      {
        name: `Wprowadzenie`,
        show: false,
        links: [
          { text: this.nowenna0, type:'opis', label: 'Wprowadzenie' },
          { text: this.litania, type:'opis', label: 'Litania do św. Ludwika' }
         
        ]
      },
      
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 0)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/01.jpg', type:'foto' },
          { text: this.prependDateFromName(`01: ${this.getDatePlusDays(this.startDate, 0)}`, this.nowenna1), type:'opis', label: 'Czułe serce św. Ludwika' }
         
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 1)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/02.jpg',type:'foto' },
          { text: this.prependDateFromName(`02: ${this.getDatePlusDays(this.startDate, 1)}`, this.nowenna2), type:'opis', label: 'Duchowe wzrastanie św. Ludwika i nasze' }
        
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 2)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/03.jpg',type:'foto' },
          { text: this.prependDateFromName(`03: ${this.getDatePlusDays(this.startDate, 2)}`, this.nowenna3), type:'opis', label: 'Zaufanie Bogu' }
          
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 3)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/04.jpg',type:'foto' },
          { text: this.prependDateFromName(`04: ${this.getDatePlusDays(this.startDate, 3)}`, this.nowenna4), type:'opis', label: 'Głosiciel królestwa Jezusa Chrystusa przez Maryję' }
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 4)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/05.jpg',type:'foto' },
          { text: this.prependDateFromName(`05: ${this.getDatePlusDays(this.startDate, 4)}`, this.nowenna5), type:'opis', label: 'Nauczyciel prawdziwego nabożeństwa do Najświętszej Maryi Panny i duchowości ofiarowania się Jezusowi przez ręce Maryi' }
        ]
      },
      {
        name: `06: ${this.getDatePlusDays(this.startDate, 5)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/06.jpg',type:'foto' },
          { text: this.prependDateFromName(`06: ${this.getDatePlusDays(this.startDate, 5)}`, this.nowenna6), type:'opis', label: 'Miłość do Kościoła' }
        ]
      },
      {
        name: `07: ${this.getDatePlusDays(this.startDate, 6)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/07.jpg',type:'foto' },
          { text: this.prependDateFromName(`07: ${this.getDatePlusDays(this.startDate, 6)}`, this.nowenna7), type:'opis', label: 'Apostoł Krzyża i Chrystusowego zwycięstwa' }
        ]
      },
      {
        name: `08: ${this.getDatePlusDays(this.startDate, 7)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/08.jpg',type:'foto' },
          { text: this.prependDateFromName(`08: ${this.getDatePlusDays(this.startDate, 7)}`, this.nowenna8), type:'opis', label: 'Nauczyciel trwania w łasce' }
        ]
      },
      {
        name: `09: ${this.getDatePlusDays(this.startDate, 8)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/09.jpg',type:'foto' },
          { text: this.prependDateFromName(`09: ${this.getDatePlusDays(this.startDate, 8)}`, this.nowenna9), type:'opis', label: 'Prowadzi nas do miłości do Jezusa' }
        ]
      }
    ]
  },
  { 
    title: 'Wyzbycie się ducha tego świata 12 dni <br><i><b>05 XI - 16 XI</b></i>', 
    show: false,
    links: [
      {
        name: 'Wprowadzenie',
        show: false,
        links: [
          { image: 'assets/wprowadzenie/01.jpg',type:'foto' },
          { text: this.tvelveDay0, type:'opis', label: 'Wprowadzenie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia (online)', hidden: true },
          { url:'assets/12dni/Droga_Maryi_12_dni_wprowadzenie.mp3', type:'audio', label:'audio Wprowadzenia (lokalny)' }
        ]
      },
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 9)}`, // 9 dni po starcie nowenny
        show: false,
        links: [
          { image: 'assets/12dni/01.jpg',type:'foto'},
          { text: this.prependDateFromName(`01: ${this.getDatePlusDays(this.startDate, 9)}`, this.tvelveDay1), type:'opis', label: 'Odkryj łaskę Bożej miłości' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_1.mp3', type:'audio', label:'1/ 12 dni : Odkryj łaskę Bożej miłości' }
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 10)}`,
        show: false,
        links: [
          { image: 'assets/12dni/02.jpg',type:'foto' },
          { text: this.prependDateFromName(`02: ${this.getDatePlusDays(this.startDate, 10)}`, this.tvelveDay2), type:'opis', label: 'Odkryj łaskę poznania prawdy o grzechu' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_2.mp3', type:'audio', label:'2/ 12 dni : Odkryj łaskę poznania prawdy o grzechu' }
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 11)}`,
        show: false,
        links: [
          { image: 'assets/12dni/03.jpg',type:'foto' },
          { text: this.prependDateFromName(`03: ${this.getDatePlusDays(this.startDate, 11)}`, this.tvelveDay3), type:'opis', label: 'Odkryj łaskę zbawienia' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_3.mp3', type:'audio', label:'3/ 12 dni : Odkryj łaskę zbawienia' }
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 12)}`,
        show: false,
        links: [
          { image: 'assets/12dni/04.jpg',type:'foto' },
          { text: this.prependDateFromName(`04: ${this.getDatePlusDays(this.startDate, 12)}`, this.tvelveDay4), type:'opis', label: 'Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_4.mp3', type:'audio', label:'4/ 12 dni : Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi' }

         
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 13)}`,
       show: false,
        links: [
          { image: 'assets/12dni/05.jpg',type:'foto' },
          { text: this.prependDateFromName(`05: ${this.getDatePlusDays(this.startDate, 13)}`, this.tvelveDay5), type:'opis', label: 'Błogosławieni ubodzy w duchu' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-5/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_5.mp3', type:'audio', label:'5/ 12 dni : Błogosławieni ubodzy w duchu' }
        ]
      },
      {
        name: `06: ${this.getDatePlusDays(this.startDate, 14)}`,
        show: false,
        links: [
          { image: 'assets/12dni/06.jpg',type:'foto' },
          { text: this.prependDateFromName(`06: ${this.getDatePlusDays(this.startDate, 14)}`, this.tvelveDay6), type:'opis', label: 'Błogosławieni, którzy się smucą' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-6/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_6.mp3', type:'audio', label:'6/ 12 dni : Błogosławieni, którzy się smucą' }
        ]
      },
      {
        name: `07: ${this.getDatePlusDays(this.startDate, 15)}`,
        show: false,
        links: [

          { image: 'assets/12dni/07.jpg',type:'foto' },
          { text: this.prependDateFromName(`07: ${this.getDatePlusDays(this.startDate, 15)}`, this.tvelveDay7), type:'opis', label: 'Błogosławieni cisi' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-7/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_7.mp3', type:'audio', label:'7/ 12 dni : Błogosławieni cisi' }
        ]
      },
      {
        name: `08: ${this.getDatePlusDays(this.startDate, 16)}`,
        show: false,
        links: [
          { image: 'assets/12dni/08.jpg',type:'foto' },
          { text: this.prependDateFromName(`08: ${this.getDatePlusDays(this.startDate, 16)}`, this.tvelveDay8), type:'opis', label: 'Błogosławieni, którzy łakną i pragną sprawiedliwości.' },
  { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-8/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_8.mp3', type:'audio', label:'8/ 12 dni : Błogosławieni, którzy łakną i pragną sprawiedliwości.' }
        ]
      },
      {
        name: `09: ${this.getDatePlusDays(this.startDate, 17)}`,
        show: false,
        links: [
           { image: 'assets/12dni/09.jpg',type:'foto' },
           { text: this.prependDateFromName(`09: ${this.getDatePlusDays(this.startDate, 17)}`, this.tvelveDay9), type:'opis', label: 'Błogosławieni miłosierni' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-9/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_9.mp3', type:'audio', label:'9/ 12 dni : Błogosławieni miłosierni' }
        ]
      },
      {
        name: `10: ${this.getDatePlusDays(this.startDate, 18)}`,
        show: false,
        links: [
          { image: 'assets/12dni/10.jpg',type:'foto' },
          { text: this.prependDateFromName(`10: ${this.getDatePlusDays(this.startDate, 18)}`, this.tvelveDay10), type:'opis', label: 'Błogosławieni czystego serca' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-10/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_10.mp3', type:'audio', label:'10/ 12 dni : Błogosławieni czystego serca' }
        ]
      },
      {
        name: `11: ${this.getDatePlusDays(this.startDate, 19)}`,
        show: false,
        links: [
          { image: 'assets/12dni/11.jpg',type:'foto' },
          { text: this.prependDateFromName(`11: ${this.getDatePlusDays(this.startDate, 19)}`, this.tvelveDay11), type:'opis', label: 'Błogosławieni, którzy wprowadzają pokój' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-11/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_11.mp3', type:'audio', label:'11/ 12 dni : Błogosławieni, którzy wprowadzają pokój' }
        ]
      },
      {
        name: `12: ${this.getDatePlusDays(this.startDate, 20)}`,
        show: false,
        links: [
          { image: 'assets/12dni/12.jpg',type:'foto' },
          { text: this.prependDateFromName(`12: ${this.getDatePlusDays(this.startDate, 20)}`, this.tvelveDay12), type:'opis', label: 'Błogosławieni, którzy cierpią prześladowanie dla sprawiedliwości' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-12/audio', type:'audio', label:'audio (online)', hidden: true },
  { url:'assets/12dni/Droga_Maryi_12_dni_dzien_12.mp3', type:'audio', label:'12/ 12 dni : Błogosławieni, którzy cierpią prześladowanie dla sprawiedliwości' }
        ]
      },
    ]
  },

{
  title: 'Tydzień pierwszy - Poznanie samego siebie <br><i><b>17 XI - 23 XI</b></i>',
  show: false, // opcjonalnie, żeby nie był od razu rozwinięty
  links: [
    {
        name: `01: ${this.getDatePlusDays(this.startDate, 21)}`,
        show: false,
        links: [
          { image: 'assets/tydzien1/1.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 21)}`, this.firstWeekDay1), type:'opis', label: 'Pożądliwość ciała' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-1/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_1.mp3', type:'audio', label:'1/ tydz. 1 : Pożądliwość ciała' }
        ]
      },
        {
        name: `02: ${this.getDatePlusDays(this.startDate, 22)}`,
       show: false,
        links: [
          { image: 'assets/tydzien1/2.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 22)}`, this.firstWeekDay2), type:'opis', label: 'Emocje' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-2/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_2.mp3', type:'audio', label:'2/ tydz. 1 : Emocje' }
        ]
      },
       {
        name: `03: ${this.getDatePlusDays(this.startDate, 23)}`,
       show: false,
        links: [
          { image: 'assets/tydzien1/3.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 23)}`, this.firstWeekDay3), type:'opis', label: 'Wyobraźnia i obraz samego siebie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-3/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_3.mp3', type:'audio', label:'3/ tydz. 1 : Wyobraźnia i obraz samego siebie' }
        ]
      },
       {
        name: `04: ${this.getDatePlusDays(this.startDate, 24)}`,
       show: false,
        links: [
          { image: 'assets/tydzien1/4.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 24)}`, this.firstWeekDay4), type:'opis', label: 'Pamięć' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-4/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_4.mp3', type:'audio', label:'4/ tydz. 1 : Pamięć' }
        ]
      },
       {
        name: `05: ${this.getDatePlusDays(this.startDate, 25)}`,
       show: false,
        links: [
          { image: 'assets/tydzien1/5.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 25)}`, this.firstWeekDay5), type:'opis', label: 'Lęki' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-5/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_5.mp3', type:'audio', label:'5/ tydz. 1 : Lęki' }
        ]
      },
       {
        name: `06: ${this.getDatePlusDays(this.startDate, 26)}`,
       show: false,
        links: [
          { image: 'assets/tydzien1/6.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 26)}`, this.firstWeekDay6), type:'opis', label: 'Pycha życiowa' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-6/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_6.mp3', type:'audio', label:'6/ tydz. 1 : Pycha życiowa' }
        ]
      },
       {
        name: `07: ${this.getDatePlusDays(this.startDate, 27)}`,
       show: false,
        links: [
          { image: 'assets/tydzien1/7.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 27)}`, this.firstWeekDay7), type:'opis', label: 'Przebaczenie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-dzien-7/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_dzien_7.mp3', type:'audio', label:'7/ tydz. 1 : Przebaczenie' }
        ]
      },
    ] 
},
{
  title: 'Tydzień drugi - Poznanie Najświętszej Maryi Panny <br><i><b>24 XI - 30 XI</b></i>',
  show: false,
  links: [
     {
        name: `01: ${this.getDatePlusDays(this.startDate, 28)}`,
        show: false,
        links: [
          { image: 'assets/tydzien2/1.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 28)}`, this.secondWeekDay1), type:'opis', label: 'Maryja Nowa Ewa' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-1/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_1.mp3', type:'audio', label:'1/ tydz. 2 : Maryja Nowa Ewa' }
        ]
      },
        {
        name: `02: ${this.getDatePlusDays(this.startDate, 29)}`,
       show: false,
        links: [
          { image: 'assets/tydzien2/2.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 29)}`, this.secondWeekDay2), type:'opis', label: 'Dziewictwo i macierzyństwo Maryi' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-2/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_2.mp3', type:'audio', label:'2/ tydz. 2 : Dziewictwo i macierzyństwo Maryi' }
        ]
      },
       {
        name: `03: ${this.getDatePlusDays(this.startDate, 30)}`,
       show: false,
        links: [
          { image: 'assets/tydzien2/3.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 30)}`, this.secondWeekDay3), type:'opis', label: 'Niepokalane Poczęcie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-3/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_3.mp3', type:'audio', label:'3/ tydz. 2 : Niepokalane Poczęcie' }
        ]
      },
       {
        name: `04: ${this.getDatePlusDays(this.startDate, 31)}`,
       show: false,
        links: [
          { image: 'assets/tydzien2/4.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 31)}`, this.secondWeekDay4), type:'opis', label: 'Wniebowzięcie Najświętszej Maryi Panny' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-4/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_4.mp3', type:'audio', label:'4/ tydz. 2 : Wniebowzięcie Najświętszej Maryi Panny' }
        ]
      },
       {
        name: `05: ${this.getDatePlusDays(this.startDate, 32)}`,
       show: false,
        links: [
          { image: 'assets/tydzien2/5.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 32)}`, this.secondWeekDay5), type:'opis', label: 'Maryja Niewiasta Eucharystii' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-5/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_5.mp3', type:'audio', label:'5/ tydz. 2 : Maryja Niewiasta Eucharystii' }
        ]
      },
       {
        name: `06: ${this.getDatePlusDays(this.startDate, 33)}`,
       show: false,
        links: [
          { image: 'assets/tydzien2/6.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 33)}`, this.secondWeekDay6), type:'opis', label: 'Niepokalane Serce Maryi – naszym schronieniem' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-6/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_6.mp3', type:'audio', label:'6/ tydz. 2 : Niepokalane Serce Maryi – naszym schronieniem' }
        ]
      },
       {
        name: `07: ${this.getDatePlusDays(this.startDate, 34)}`,
       show: false,
        links: [
          { image: 'assets/tydzien2/7.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 34)}`, this.secondWeekDay7), type:'opis', label: 'Apostołowie Tryumfu Niepokalanego Serca Maryi' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-dzien-7/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_dzien_7.mp3', type:'audio', label:'7/ tydz. 2 : Apostołowie Tryumfu Niepokalanego Serca Maryi' }
        ]
      },
  ] 
},
{
  title: `Tydzień trzeci - Poznanie Jezusa Chrystusa <br><i><b>01 XII - 07 XII</b></i>`,
  show: false,
  links: [{
        name: `01: ${this.getDatePlusDays(this.startDate, 35)}`,
        show: false,
        links: [
          { image: 'assets/tydzien3/1.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 35)}`, this.thirdWeekDay1), type:'opis', label: 'Zwiastowanie. Jezus-Słowo Boże. Jezus-Ewangelia.' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-1/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_1.mp3', type:'audio', label:'1/ tydz. 3 : Zwiastowanie. Jezus-Słowo Boże. Jezus-Ewangelia.' }
        ]
      },
        {
        name: `02: ${this.getDatePlusDays(this.startDate, 36)}`,
       show: false,
        links: [
          { image: 'assets/tydzien3/2.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 36)}`, this.thirdWeekDay2), type:'opis', label: 'Boże Narodzenie. Jezus-Dziecko. Jezus-Chleb' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-2/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_2.mp3', type:'audio', label:'2/ tydz. 3 : Boże Narodzenie. Jezus-Dziecko. Jezus-Chleb' }
        ]
      },
       {
        name: `03: ${this.getDatePlusDays(this.startDate, 37)}`,
       show: false,
        links: [
          { image: 'assets/tydzien3/3.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 37)}`, this.thirdWeekDay3), type:'opis', label: 'Ofiarowanie w świątyni. Jezus-Prawo Miłości. Jezus-droga do Nieba.' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-3/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_3.mp3', type:'audio', label:'3/ tydz. 3 : Ofiarowanie w świątyni. Jezus-Prawo Miłości. Jezus-droga do Nieba.' }
        ]
      },
       {
        name: `04: ${this.getDatePlusDays(this.startDate, 38)}`,
       show: false,
        links: [
          { image: 'assets/tydzien3/4.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 38)}`, this.thirdWeekDay4), type:'opis', label: 'Znalezienie w świątyni. Jezus szukany i znaleziony. Jezus zjednoczony z Ojcem' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-4/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_4.mp3', type:'audio', label:'4/ tydz. 3 : Znalezienie w świątyni. Jezus szukany i znaleziony. Jezus zjednoczony z Ojcem' }
        ]
      },
       {
        name: `05: ${this.getDatePlusDays(this.startDate, 39)}`,
       show: false,
        links: [
          { image: 'assets/tydzien3/5.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 39)}`, this.thirdWeekDay5), type:'opis', label: 'Cud przemiany wody w wino w Kanie Galilejskiej. Jezus Zbawiciel. Jezus Źródło przemiany' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-5/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_5.mp3', type:'audio', label:'5/ tydz. 3 : Cud przemiany wody w wino w Kanie Galilejskiej. Jezus Zbawiciel. Jezus Źródło przemiany' }
        ]
      },
       {
        name: `06: ${this.getDatePlusDays(this.startDate, 40)}`,
       show: false,
        links: [
          { image: 'assets/tydzien3/6.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 40)}`, this.thirdWeekDay6), type:'opis', label: 'Ukrzyżowanie. Jezus Król. Jezus MIŁOŚĆ' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-6/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_6.mp3', type:'audio', label:'6/ tydz. 3 : Ukrzyżowanie. Jezus Król. Jezus MIŁOŚĆ' }
        ]
      },
       {
        name: `07: ${this.getDatePlusDays(this.startDate, 41)}`,
       show: false,
        links: [
          { image: 'assets/tydzien3/7.jpg',type:'foto' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 41)}`, this.thirdWeekDay7), type:'opis', label: 'Zesłanie Ducha Świętego. Jezus Kościół. Jezus Chrzczący Duchem Świętym.' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-dzien-7/audio', type:'audio', label:'audio (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_dzien_7.mp3', type:'audio', label:'7/ tydz. 3 : Zesłanie Ducha Świętego. Jezus Kościół. Jezus Chrzczący Duchem Świętym.' }
        ]
      },]
},
{
  title: `Dzień oddania <br><i><b>08 XII</b></i>`,
  show: false,
  links: [
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 42)}`,
        show: false,
        links: [        
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 42)}`, this.oddanieDay0), type:'opis', label: 'Dzień oddania się Panu Jezusowi przez Maryję w Niewolę Miłości' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/dzien-oddania/audio', type:'audio', label:'audio (online)', hidden: true  },
          { url:'assets/oddanie/Droga_Maryi_dzien_oddania_sie_panu_Jezusowi_przez_Maryje_w_niewole_milosci.mp3', type:'audio', label:'Dzień oddania się Panu Jezusowi przez Maryję w Niewolę Miłości' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 42)}`, this.oddanieDayAkt), type:'opis', label: 'Akt oddania siebie Jezusowi Chrystusowi, Mądrości Wcielonej, przez ręce Maryi' },
          { url: 'assets/oddanie/akt.pdf',type:'pdf', label:'Pobierz Akt oddania (PDF)'}      
        ]
      }]
}
];


 private readonly summaryPassword = 'syn';

  // ----------------------
  // INICJALIZACJA - AUTOMATYCZNE OTWIERANIE DZISIEJSZYCH FOLDERÓW
  // ----------------------
  ngOnInit() {
    this.openTodayFolders();
    setTimeout(() => {
      this.scrollToToday();
    }, 2000);

    // Dodano: podgląd tekstów nowenny w konsoli
    console.log('Tekst pierwszego dnia:', this.nowenna1);
    console.log('Tekst drugiego dnia:', this.nowenna2);
  }

  // Zarządzanie odtwarzaniem lokalnych audio dla 12 dni
localAudioElements: { [url: string]: HTMLAudioElement } = {};
localAudioPlayingUrl: string | null = null;

playLocalAudio(url: string) {
  // Jeśli kliknięto na już grający audio, zatrzymaj tylko ten
  if (this.localAudioPlayingUrl === url && this.localAudioElements[url]) {
    this.localAudioElements[url].pause();
    this.localAudioElements[url].currentTime = 0;
    this.localAudioPlayingUrl = null;
    return;
  }
  // Zatrzymaj wszystkie inne audio
  this.stopAllAudio();
  // Utwórz element jeśli nie istnieje
  if (!this.localAudioElements[url]) {
    this.localAudioElements[url] = new Audio(url);
    this.localAudioElements[url].volume = 0.8;
    this.localAudioElements[url].addEventListener('ended', () => {
      if (this.localAudioPlayingUrl === url) {
        this.localAudioPlayingUrl = null;
      }
    });
    this.localAudioElements[url].addEventListener('error', () => {
      alert('Nie można odtworzyć pliku audio.');
      if (this.localAudioPlayingUrl === url) {
        this.localAudioPlayingUrl = null;
      }
    });
  }
  this.localAudioElements[url].play()
    .then(() => {
      this.localAudioPlayingUrl = url;
    })
    .catch(() => {
      alert('Nie można odtworzyć pliku audio.');
      this.localAudioPlayingUrl = null;
    });
}

isLocalAudioPlaying(url: string): boolean {
  return this.localAudioPlayingUrl === url;
}

  // Automatyczne otwieranie folderów z dzisiejszą datą
  openTodayFolders() {
    this.items.forEach(item => {
      // Sprawdzamy czy tytuł zawiera dzisiejszą datę w zakresie
      if (this.isTodayInTitleRange(item.title)) {
        item.show = true;
      }

      // Sprawdzamy grupy w każdym elemencie
      item.links?.forEach(group => {
        // Otwieramy grupę jeśli jej nazwa zawiera dzisiejszą datę
        if (group.name && this.isToday(group.name)) {
          group.show = true;
          // Otwieramy też główny element jeśli grupa się otworzyła
          item.show = true;
        }

        // Sprawdzamy zagnieżdżone linki
        group.links?.forEach(nestedLink => {
          if (nestedLink.name && this.isToday(nestedLink.name)) {
            nestedLink.show = true;
            group.show = true;
            item.show = true;
          }
        });
      });
    });
  }

   // ----------------------
  // OTWIERANIE LINKÓW
  // ----------------------
  openLink(linkOrGroup: SingleLink | SingleLink[]) {
    if (Array.isArray(linkOrGroup)) {
      if (linkOrGroup.length > 0) window.open(linkOrGroup[0].url, '_blank');
      return;
    }
    if (linkOrGroup.url) window.open(linkOrGroup.url, '_blank');
  }

  // ----------------------
  // ROZWIJANIE/ZWIJANIE EVENTÓW
  // ----------------------
  toggle(obj: Item) {
    // Zamknij wszystkie inne główne foldery i ich podkatalogi
    this.items.forEach(item => {
      if (item !== obj) {
        item.show = false;
        // Zamknij wszystkie grupy w tym folderze
        item.links?.forEach(group => {
          group.show = false;
          // Zamknij wszystkie zagnieżdżone linki
          group.links?.forEach(nestedLink => {
            if (nestedLink.show !== undefined) nestedLink.show = false;
          });
        });
      } else {
        // Jeśli klikamy na już otwarty folder, zamknij wszystkie jego podgrupy
        if (item.show) {
          item.links?.forEach(group => {
            group.show = false;
            group.links?.forEach(nestedLink => {
              if (nestedLink.show !== undefined) nestedLink.show = false;
            });
          });
        }
      }
    });
    // Jeśli zamykamy sekcję, zatrzymaj audio
    if (obj.show) {
      // Sekcja była otwarta, teraz ją zamykamy
      this.stopAllAudio();
    }
    // Przełącz widoczność klikniętego folderu
    obj.show = !obj.show;
    // Przewiń do folderu po otwarciu
    if (obj.show) {
      const index = this.items.indexOf(obj);
      const folderElem = document.getElementById('folder-' + index);
      if (folderElem) {
        folderElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // Zatrzymuje wszystkie odtwarzane audio
  stopAllAudio() {
    // Zatrzymaj Totus Tuus
    if (this.audioElement && this.isAudioPlaying) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isAudioPlaying = false;
    }
    // Zatrzymaj lokalne Wprowadzenie
    if (this.localIntroAudioElement && this.isLocalIntroAudioPlaying) {
      this.localIntroAudioElement.pause();
      this.localIntroAudioElement.currentTime = 0;
      this.isLocalIntroAudioPlaying = false;
    }
    // Zatrzymaj wszystkie lokalne audio dla 12 dni
    if (this.localAudioElements) {
      Object.values(this.localAudioElements).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      this.localAudioPlayingUrl = null;
    }
  }

  // ----------------------
  // CHRONIONE TEKSTY
  // ----------------------
  toggleLink(group: LinkGroup) {
    if (group.links && group.links.length === 1) {
      window.open(group.links[0].url, '_blank');
      return;
    }
    if (group.protected) {
      if (group.show) { group.show = false; return; }
      const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
      if (password === this.summaryPassword) group.show = true;
      else alert('Błędne hasło!');
      return;
    }
    group.show = !group.show;
  }

  // Metoda do przełączania zagnieżdżonych grup
  toggleNestedGroup(nestedGroup: SingleLink) {
    nestedGroup.show = !nestedGroup.show;
  }

  // ----------------------
  // TRACKBY dla *ngFor
  // ----------------------
  trackByTitle(index: number, item: Item) {
    return item.title;
  }

  trackByName(index: number, group: LinkGroup) {
    return group.name;
  }

  // ----------------------
  // TRYB PEŁNOEKRANOWY OBRAZKA
  // ----------------------
  toggleFullscreen(url?: string) {
    if (url) {
      this.fullscreenImage = this.fullscreenImage === url ? null : url;
    } else {
      this.fullscreenImage = null; // Zamknij fullscreen
    }
  }

  // Obsługa ładowania obrazka
  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    console.log('Obrazek załadowany:', img.src);
    img.style.opacity = '1';
    img.classList.add('loaded');
  }

  // Obsługa błędu ładowania obrazka
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '0.5';
    img.classList.add('error');
    console.warn('Błąd ładowania obrazka:', img.src);
  }


  // ----------------------
  // CZY DANA DATA JEST DZISIAJ
  // ----------------------
  isTodayInTitleRange(title: string): boolean {
    if (!title) return false;
    const matches = title.match(/\d{4}-\d{2}-\d{2}/g);
    if (!matches || matches.length < 2) return false;

    const start = new Date(matches[0]);
    const end = new Date(matches[1]);
    const today = this.currentDateTime ?? new Date();
    today.setHours(0,0,0,0);

    return today >= start && today <= end;
  }

  isToday(name: string): boolean {
    if (!name) return false;
    // Sprawdzamy nowy format dd.MM.yyyy
    const newFormatMatch = name.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    const today = this.currentDateTime ?? new Date();
    if (newFormatMatch) {
      const [, day, month, year] = newFormatMatch;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
    }
    // Fallback na stary format YYYY-MM-DD (jeśli gdzieś jeszcze zostały)
    const oldFormatMatch = name.match(/\d{4}-\d{2}-\d{2}/);
    if (oldFormatMatch) {
      const date = new Date(oldFormatMatch[0]);
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
    }
    return false;
  }

  // Sprawdza czy grupa ma wewnętrzne elementy z dzisiejszą datą
  hasInnerTodayElements(group: LinkGroup): boolean {
    if (!group.links) return false;
    
    return group.links.some(link => {
      // Sprawdzamy czy link ma dzisiejszą datę w nazwie
      if (link.name && this.isToday(link.name)) return true;
      if (link.label && this.isToday(link.label)) return true;
      if (link.url && this.isToday(link.url)) return true;
      
      // Sprawdzamy zagnieżdżone linki
      if (link.links) {
        return link.links.some(nestedLink => {
          return (nestedLink.label && this.isToday(nestedLink.label)) ||
                 (nestedLink.url && this.isToday(nestedLink.url)) ||
                 (nestedLink.name && this.isToday(nestedLink.name));
        });
      }
      
      return false;
    });
  }

  // Sprawdza czy główny element (Item) ma wewnętrzne grupy z dzisiejszą datą
  hasInnerTodayGroups(item: Item): boolean {
    if (!item.links) return false;
    
    return item.links.some(group => {
      // Sprawdzamy czy sama grupa ma dzisiejszą datę w nazwie
      if (group.name && this.isToday(group.name)) return true;
      
      // Sprawdzamy czy grupa ma wewnętrzne elementy z dzisiejszą datą
      return this.hasInnerTodayElements(group);
    });
  }

  // ----------------------
  // OTWIERANIE TYLKO JEDNEJ GRUPY
  // ----------------------
  openOnly(groupToOpen: LinkGroup, item: Item) {
    // Zamykamy wszystkie inne główne foldery
    this.items.forEach(i => {
      if (i !== item) i.show = false;
      i.links?.forEach(g => g.show = false);
    });
    // Zamykamy wszystkie inne grupy w tym elemencie
    item.links?.forEach(g => { if (g !== groupToOpen) g.show = false; });
    
    // Sprawdzamy czy to jest pojedynczy link - jeśli tak, otwieramy go
    if (groupToOpen.links && groupToOpen.links.length === 1) {
      window.open(groupToOpen.links[0].url, '_blank');
      return;
    }
    
    // Obsługa chronionych tekstów
    if (groupToOpen.protected) {
      if (groupToOpen.show) { 
        groupToOpen.show = false; 
        return; 
      }
      const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
      if (password === this.summaryPassword) {
        groupToOpen.show = true;
      } else {
        alert('Błędne hasło!');
      }
      return;
    }
    
    // Zwykłe przełączanie widoczności
    groupToOpen.show = !groupToOpen.show;
    // Jeśli właśnie otwieramy podfolder, przewiń do jego góry
    if (groupToOpen.show) {
      setTimeout(() => {
        // Spróbuj znaleźć element DOM podfolderu
        const groupElems = document.querySelectorAll('.group-container');
        for (let elem of Array.from(groupElems)) {
          // Sprawdź czy tekst grupy zgadza się z nazwą
          if (elem.textContent && groupToOpen.name && elem.textContent.includes(groupToOpen.name)) {
            (elem as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          }
        }
      }, 300);
    }
  }

    // NOWA METODA: BEZPIECZNY GŁÓWNY LINK
  // ----------------------
  getMainLink(group: LinkGroup): string | null {
    if (!group.links || group.links.length === 0) return null;
    return group.links.length === 1 ? group.links[0]?.url || null : null;
  }

  // ----------------------
  // KONTROLKI NAWIGACJI MOBILE
  // ----------------------
  collapseAll() {
    this.items.forEach(item => {
      item.show = false;
      item.links?.forEach(group => {
        group.show = false;
        group.links?.forEach(nestedLink => {
          if (nestedLink.show !== undefined) nestedLink.show = false;
        });
      });
    });
  }

  expandToday() {
    // Najpierw zwiń wszystko
    this.collapseAll();
    // Potem otwórz tylko dzisiejsze elementy
    this.openTodayFolders();
  }

  // ----------------------
  // ZAMYKANIE STRONY
  // ----------------------
  closePage() {
    // Sprawdź czy można zamknąć okno (działa gdy strona została otwarta przez JavaScript)
    const canClose = window.opener !== null || window.history.length <= 1;
    
    if (canClose) {
      // Spróbuj zamknąć okno
      window.close();
    }
    
    // Sprawdź po krótkim czasie czy okno się zamknęło
    setTimeout(() => {
      if (!window.closed) {
        // Okno się nie zamknęło - pokaż instrukcje
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const shortcut = isMac ? '⌘+W' : 'Ctrl+W';
        
        const message = `🔒 Przeglądarka blokuje automatyczne zamykanie kart ze względów bezpieczeństwa.\n\n` +
                       `✨ Aby zamknąć kartę:\n` +
                       `• Użyj skrótu: ${shortcut}\n` +
                       `• lub kliknij ✕ na karcie\n` +
                       `• lub zamknij całe okno przeglądarki`;
                       
        alert(message);
      }
    }, 50);
  }

  // ----------------------
  // AUDIO PLAYER TOTUS TUUS
  // ----------------------
  isAudioPlaying = false;
  audioElement: HTMLAudioElement | null = null;
  // Lokalny plik MP3 w assets
  private audioUrl = 'assets/totus_tuus.mp3';

  toggleAudio() {
    if (this.isAudioPlaying) {
      // Zatrzymaj Totus Tuus
      this.audioElement?.pause();
      this.audioElement!.currentTime = 0;
      this.isAudioPlaying = false;
    } else {
      // Zatrzymaj inne audio
      this.stopAllAudio();
      if (!this.audioElement) {
        this.audioElement = new Audio(this.audioUrl);
        this.audioElement.volume = 0.7; // 70% głośności
        this.audioElement.addEventListener('ended', () => {
          this.isAudioPlaying = false;
        });
        this.audioElement.addEventListener('error', (e) => {
          console.error('Błąd odtwarzania audio:', e);
          alert('Nie można odtworzyć pliku audio. Sprawdź połączenie internetowe.');
          this.isAudioPlaying = false;
        });
      }
      this.audioElement.play()
        .then(() => {
          this.isAudioPlaying = true;
        })
        .catch((error) => {
          console.error('Błąd odtwarzania:', error);
          alert('Nie można odtworzyć audio. Sprawdź połączenie internetowe.');
          this.isAudioPlaying = false;
        });
    }
  }

  // ----------------------
  // AUTOMATYCZNE PRZEWIJANIE DO DZISIEJSZEGO ELEMENTU
  // ----------------------
  scrollToToday() {
    // Przewijaj tylko jeśli jeszcze tego nie robiono
    if (this.hasScrolledToToday) {
      return;
    }

    // Znajdź pierwszy element z dzisiejszą datą
    const todayElement = document.querySelector('.today-highlight');
    
    if (todayElement) {
      // Proste przewijanie do dzisiejszego elementu z małym offsetem od góry
      const elementTop = todayElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = 150; // Stały offset żeby zostawić miejsce na header
      
      window.scrollTo({
        top: Math.max(0, elementTop - offset),
        behavior: 'smooth'
      });
      
      // Oznacz że przewijanie już się odbyło
      this.hasScrolledToToday = true;
    }
    // Jeśli nie ma dzisiejszego elementu - pozostaw stronę na górze i oznacz jako wykonane
    this.hasScrolledToToday = true;
  }

  // ----------------------
  // SPRAWDZANIE CZY GRUPA MA ELEMENTY FOTO
  // ----------------------
  hasPhotoElements(links: any[]): boolean {
    return links && links.some(link => link.type === 'foto');
  }

  // ----------------------
  // PRZETWARZANIE TEKSTU NA HTML Z KLIKALNYMI LINKAMI
  // ----------------------
  processTextWithLinks(text: string): string {
    if (!text) return '';
    
    // Formatowanie HTML dla wyświetlania na stronie
    let processedText = text
      // Konwertuj formatowanie na HTML (kombinacje najpierw!)
      .replace(/\*_([^_*]+)_\*/g, '<strong><em>$1</em></strong>') // *_tekst_* → <strong><em>
      .replace(/_\*([^*_]+)\*_/g, '<em><strong>$1</strong></em>') // _*tekst*_ → <em><strong>
      .replace(/\*([^*]+)\*/g, '<strong>$1</strong>') // *tekst* → <strong>
      .replace(/_([^_]+)_/g, '<em>$1</em>') // _tekst_ → <em>
      .replace(/\n/g, '<br>') // nowe linie
      // Cytaty kursywą
      .replace(/^"([^"]+)"$/gm, '<em>"$1"</em>') // "cytat" → <em>
      // Specjalne sekcje
      .replace(/(\*Modlitwa:\*)/g, '<br><strong>🙏 Modlitwa:</strong>')
      .replace(/(\*Dzień [^:]+:\*)/g, '<strong>📿 $1</strong>');
    
    // Zamieniamy URL-e na klikalny linki
    const urlRegex = /(https?:\/\/[^\s<>]+)/g;
    processedText = processedText.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" class="inline-link">$1</a>');
    
    return processedText;
  }

  // FORMATOWANIE TEKSTU DLA WHATSAPP (MARKDOWN)
  // ----------------------
  private formatTextForWhatsApp(text: string): string {
    if (!text) return '';
    
    return text
      // USUŃ WSZYSTKIE wcięcia z początku każdej linii - WhatsApp zaczyna od lewej
      .replace(/^\s+/gm, '') 
      // Zachowaj formatowanie WhatsApp (kombinacje najpierw!)
      .replace(/\*_([^_*]+)_\*/g, '*_$1_*') // *_tekst_* → zachowaj dla WhatsApp
      .replace(/_\*([^*_]+)\*_/g, '_*$1*_') // _*tekst*_ → zachowaj dla WhatsApp
      .replace(/\*([^*]+)\*/g, '*$1*') // *bold* dla WhatsApp
      .replace(/_([^_]+)_/g, '_$1_') // _italic_ dla WhatsApp (zachowaj)
      .replace(/\n{3,}/g, '\n\n') // zmniejsz nadmierne nowe linie
      // Dodaj emotikony do sekcji
      .replace(/(\*Modlitwa:\*)/g, '\n🙏 $1')
      .replace(/(\*Dzień [^:]+:\*)/g, '📿 $1')
      // Kursywa dla cytatów
      .replace(/^"([^"]+)"$/gm, '_"$1"_');
      // Link źródła jest obsługiwany osobno w copyTextToClipboard()
  }

  // ZARZĄDZANIE WIDOCZNOŚCIĄ TEKSTU
  // ----------------------
  toggleTextVisibility(linkItem: any) {
    if (linkItem.type === 'opis') {
      if (linkItem.show) {
        linkItem.show = false;
        // Przewiń do góry podfolderu, w którym był tekst
        setTimeout(() => {
          // Spróbuj znaleźć najbliższy kontener podfolderu w DOM
          let parentElem = null;
          if (linkItem.label) {
            const allGroups = document.querySelectorAll('.group-container');
            for (let elem of Array.from(allGroups)) {
              if (elem.textContent && elem.textContent.includes(linkItem.label)) {
                parentElem = elem;
                break;
              }
            }
          }
          // Fallback: przewiń do najbliższego folderu
          if (!parentElem) {
            const allFolders = document.querySelectorAll('[id^="folder-"]');
            if (allFolders.length > 0) {
              parentElem = allFolders[0];
            }
          }
          if (parentElem) {
            (parentElem as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        linkItem.show = true;
      }
    }
  }

  // KOPIOWANIE TEKSTU DO SCHOWKA Z FORMATOWANIEM WHATSAPP
  // ----------------------
  async copyTextToClipboard(text: string, linkItem?: SingleLink) {
    if (!text) {
      alert('Brak tekstu do skopiowania.');
      return;
    }

    try {
      // ZAWSZE wyczyść schowek przed kopiowaniem nowego tekstu
      try {
        await navigator.clipboard.writeText('');
        console.log('🧹 Schowek wyczyszczony');
        // Krótkie opóźnienie żeby mieć pewność że czyszczenie się wykonało
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (clearError) {
        console.warn('⚠️ Nie udało się wyczyścić schowka:', clearError);
      }
      
      // Wyciągnij link źródła jeśli istnieje
      const sourceMatch = text.match(/\s*Źródło:\s+(https?:\/\/[^\s<>]+)/);
      const sourceUrl = sourceMatch ? sourceMatch[1] : null;
      
      // Usuń oryginalny link źródła z tekstu do formatowania
      let cleanText = text.replace(/\s*Źródło:\s+https?:\/\/[^\s<>]+/g, '');

      // Dodaj URL audio jeśli istnieje
      if (linkItem && linkItem.type === 'audio' && linkItem.url) {
        cleanText += `\n${linkItem.url}`;
      }

      // Sformatuj tekst dla WhatsApp z HTML
      const whatsappText = this.whatsappFormatter.formatForWhatsApp(cleanText);

      // Skopiuj do schowka
      await navigator.clipboard.writeText(whatsappText);

      console.log('✅ Tekst skopiowany:', whatsappText.length, 'znaków');
      alert(`✅ Tekst został skopiowany do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Ten tekst jest sformatowany pod WhatsApp.`);
    } catch (error) {
      console.error('❌ BŁĄD kopiowania tekstu:', error);
      // Fallback - pokaż tekst do ręcznego skopiowania
      const whatsappText = this.formatTextForWhatsApp(text);
      const result = prompt('⚠️ Nie udało się automatycznie skopiować tekstu.\n\nSkopiuj go ręcznie (Ctrl+C):', whatsappText);
      if (result !== null) {
        alert('✅ Tekst gotowy do wklejenia!');
      }
    }
  }
}