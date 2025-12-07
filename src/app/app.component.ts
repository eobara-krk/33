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
import { TextFormatService } from './text-format.service';
import { TextVisibilityService } from './text-visibility.service';
import { WhatsappCopyService } from './whatsapp-copy.service';
import { getDaysToEnd, getDaysRangeLabel } from './cycle-utils';
import { DynamicTitles } from './dynamic-titles';
import { AudioPlayerService } from './audio-player.service';
import { getWiosnaStart, getWiosnaStop } from './constants';
import { FolderVisibilityService } from './folder-visibility.service';
import { DateUtilsService } from './date-utils.service';
import { LinkService } from './link.service';
import { ImageService } from './image.service';

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
  constructor(
    private whatsappCopyService: WhatsappCopyService,
    private whatsappFormatter: WhatsAppFormatterService,
    public audioPlayer: AudioPlayerService,
    public textVisibilityService: TextVisibilityService,
    public textFormatService: TextFormatService,
    public folderVisibilityService: FolderVisibilityService,
    public dateUtilsService: DateUtilsService,
    public linkService: LinkService,
    public imageService: ImageService
  ) {}
  
  title = '33';

  // AUDIO PLAYER TOTUS TUUS przez serwis
  audioUrl = 'assets/totus_tuus.mp3';

  private readonly summaryPassword = 'syn';

  currentDateTime: Date = new Date(); // data biezaca
   //currentDateTime: Date | null = new Date(2026, 4, 1); // (2025, 4, 2) = 2 maj


  // KONFIGURACJA DAT - tutaj ustawiasz datę startu 

get startDate(): Date {
  const today = this.currentDateTime ?? new Date();
  today.setHours(0,0,0,0);
  const year = today.getFullYear();
  const wiosnaStart = getWiosnaStart(year);
  const jesienStart = new Date(year, 9, 27); // 27 października

  if (today < wiosnaStart) {
    return new Date(year, 2, 22);
  }
  if (today >= wiosnaStart && today < jesienStart) {
    return new Date(year, 2, 22);
  }
  if (today >= jesienStart) {
    return jesienStart;
  }
  return new Date(year, 2, 22);
}

get daysToEnd(): string {
  const today = this.currentDateTime ?? new Date();
  today.setHours(0,0,0,0);
  let year = today.getFullYear();
  let target = new Date(year, 11, 8); // 8 grudnia
  if (today > target) {
    target = new Date(year + 1, 11, 8);
  }
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 1) {
    return `Pozostał 1 dzień do 8 grudnia!`;
  }
  if (diff % 10 === 1 && diff !== 11) {
    return `Pozostał ${diff} dzień do 8 grudnia!`;
  }
  return `Pozostało ${diff} dni do 8 grudnia!`;
}

  get daysRangeLabel(): string {
    return getDaysRangeLabel(this.currentDateTime);
  }


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


  // Debounce helper
  private lastAudioToggle = 0;
  private debounceMs = 400;

  // Unified audio toggle for any audio file (Totus Tuus or local) with debounce
  toggleAudio(url: string = this.audioUrl) {
    const now = Date.now();
    if (now - this.lastAudioToggle < this.debounceMs) {
      return;
    }
    this.lastAudioToggle = now;

    const audioEl = (this.audioPlayer as any).audioElements?.[url];
    if (audioEl && audioEl.paused && audioEl.currentTime > 0 && (this.audioPlayer.getCurrentUrl() === null)) {
      audioEl.play();
      (this.audioPlayer as any).playingUrl = url;
    } else if (this.audioPlayer.isPlaying(url)) {
      this.audioPlayer.pauseOnly(url);
    } else {
      // Stop all other audio
      this.audioPlayer.stopAll();
      this.audioPlayer.play(
        url,
        0.8,
        () => {},
        () => {}
      );
    }
  }

  // Stop any audio by url
  stopAudio(url: string = this.audioUrl) {
  this.audioPlayer.pause(url);
  }
 
  // Sprawdza czy w tablicy linków jest audio z url
  hasAudioLink(links: SingleLink[]): boolean {
    return Array.isArray(links) && links.some(x => x.type === 'audio' && !!x.url);
  }


  // Kopiowanie tekstu + linku audio w formacie WhatsApp
  copyAudioTextToClipboard(links: SingleLink[]) {
    this.whatsappCopyService.copyAudioTextToClipboard(links, this.whatsappFormatter);
  }

  copyAsWhatsapp(text: string) {
    const formatted = this.whatsappFormatter.simpleFormatForWhatsApp(text);
    navigator.clipboard.writeText(formatted);
  }

  fullscreenImage: string | null = null; // <-- globalny fullscreen
  private hasScrolledToToday: boolean = false; // Flaga czy już przewinięto do dzisiejszej daty


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

  // Odtwarzanie lokalnych audio przez serwis
  playLocalAudio(url: string, volume = 1, onEnd?: () => void, onError?: () => void) {
    this.audioPlayer.play(url, volume, onEnd, onError);
  }

  isLocalAudioPlaying(url: string): boolean {
    return this.audioPlayer.isPlaying(url);
  }

  // Automatyczne otwieranie folderów z dzisiejszą datą
  openTodayFolders = () => this.folderVisibilityService.openTodayFolders(
    this.items,
    (title: string) => this.dateUtilsService.isTodayInTitleRange(title, this.currentDateTime),
    (name: string) => this.dateUtilsService.isToday(name, this.currentDateTime)
  );

   // ----------------------
  // OTWIERANIE LINKÓW
  // ----------------------
  openLink(linkOrGroup: SingleLink | SingleLink[]) {
    this.linkService.openLink(linkOrGroup);
  }

  // ----------------------
  // ROZWIJANIE/ZWIJANIE EVENTÓW
  // ----------------------
  toggle = (obj: Item) => this.folderVisibilityService.toggle(this.items, obj, () => this.stopAllAudio());

  // Zatrzymuje wszystkie odtwarzane audio przez serwis
  stopAllAudio = () => {
  this.audioPlayer.stopAll();
  this.audioPlayer.pause(this.audioUrl);
  };

  // ----------------------
  // CHRONIONE TEKSTY
  // ----------------------
  toggleLink = (group: LinkGroup) => this.folderVisibilityService.toggleLink(group, this.summaryPassword);

  // Metoda do przełączania zagnieżdżonych grup
  toggleNestedGroup = (nestedGroup: SingleLink) => this.folderVisibilityService.toggleNestedGroup(nestedGroup);

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
  toggleFullscreen = (url?: string) => {
    this.fullscreenImage = this.imageService.toggleFullscreen(this.fullscreenImage, url);
  };

  // Obsługa ładowania obrazka
  onImageLoad = (event: Event) => this.imageService.onImageLoad(event);
  onImageError = (event: Event) => this.imageService.onImageError(event);


  // ----------------------
  // CZY DANA DATA JEST DZISIAJ
  // ----------------------
  isTodayInTitleRange = (title: string) => this.dateUtilsService.isTodayInTitleRange(title, this.currentDateTime);
  isToday = (name: string) => this.dateUtilsService.isToday(name, this.currentDateTime);
  hasInnerTodayElements = (group: LinkGroup) => this.dateUtilsService.hasInnerTodayElements(group, this.currentDateTime);
  hasInnerTodayGroups = (item: Item) => this.dateUtilsService.hasInnerTodayGroups(item, this.currentDateTime);

  // ----------------------
  // OTWIERANIE TYLKO JEDNEJ GRUPY
  // ----------------------
  openOnly = (groupToOpen: LinkGroup, item: Item) => {
    this.folderVisibilityService.openOnly(this.items, groupToOpen, item, this.summaryPassword);
    if (groupToOpen.show) {
      setTimeout(() => {
        const groupElems = document.querySelectorAll('.group-container');
        for (let elem of Array.from(groupElems)) {
          if (elem.textContent && groupToOpen.name && elem.textContent.includes(groupToOpen.name)) {
            (elem as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          }
        }
      }, 300);
    }
  };

    // NOWA METODA: BEZPIECZNY GŁÓWNY LINK
  // ----------------------
  getMainLink = (group: LinkGroup): string | null => this.linkService.getMainLink(group);

  // ----------------------
  // KONTROLKI NAWIGACJI MOBILE
  // ----------------------
  collapseAll = () => this.folderVisibilityService.collapseAll(this.items);

  expandToday = () => this.folderVisibilityService.expandToday(this.items, (items: Item[]) => this.openTodayFolders());

  // ----------------------
  // ZAMYKANIE STRONY
  // ----------------------
  closePage() {
    // Sprawdź czy można zamknąć okno (działa gdy strona została otwarta przez JavaScript)
    const canClose = window.opener !== null || window.history.length <= 1;
    if (canClose) {
      window.close();
      // Jeśli okno się nie zamknęło, przekieruj na about:blank
      setTimeout(() => {
        if (!window.closed) {
          window.location.href = 'about:blank';
        }
      }, 50);
    } else {
      // Jeśli nie można zamknąć, od razu przekieruj na about:blank
      window.location.href = 'about:blank';
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
  hasPhotoElements = (links: any[]): boolean => this.imageService.hasPhotoElements(links);


    // Pomocnicza metoda: wstawia datę z pola name na początek tekstu
  prependDateFromName(name: string, text: string): string {
    // Wyciągnij datę z pola name (po dwukropku i spacji)
    const match = name.match(/\d{2}: (.+)/);
    const date = match ? match[1] : name;
    return `<b>${date}</b><br>${text}`;
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

readonly firstWeekDay0 = FirstWeekTexts.dzien0;
readonly firstWeekDay1 = FirstWeekTexts.dzien1;
readonly firstWeekDay2 = FirstWeekTexts.dzien2;
readonly firstWeekDay3 = FirstWeekTexts.dzien3;
readonly firstWeekDay4 = FirstWeekTexts.dzien4;
readonly firstWeekDay5 = FirstWeekTexts.dzien5;
readonly firstWeekDay6 = FirstWeekTexts.dzien6;
readonly firstWeekDay7 = FirstWeekTexts.dzien7;

readonly secondWeekDay0 = SecondWeekTexts.dzien0;
readonly secondWeekDay1 = SecondWeekTexts.dzien1;
readonly secondWeekDay2 = SecondWeekTexts.dzien2
readonly secondWeekDay3 = SecondWeekTexts.dzien3;
readonly secondWeekDay4 = SecondWeekTexts.dzien4;
readonly secondWeekDay5 = SecondWeekTexts.dzien5;
readonly secondWeekDay6 = SecondWeekTexts.dzien6;
readonly secondWeekDay7 = SecondWeekTexts.dzien7;

readonly thirdWeekDay0 = ThirdWeekTexts.dzien0;
readonly thirdWeekDay1 = ThirdWeekTexts.dzien1;
readonly thirdWeekDay2 = ThirdWeekTexts.dzien2;
readonly thirdWeekDay3 = ThirdWeekTexts.dzien3;
readonly thirdWeekDay4 = ThirdWeekTexts.dzien4;
readonly thirdWeekDay5 = ThirdWeekTexts.dzien5;
readonly thirdWeekDay6 = ThirdWeekTexts.dzien6;
readonly thirdWeekDay7 = ThirdWeekTexts.dzien7;

readonly oddanieDayAkt = OddanieTexts.dzienAkt;
readonly oddanieDay0 = OddanieTexts.dzien0;  


items: Item[] = [
  { 
  title: DynamicTitles.getNovenaTitle(this.startDate),
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
  title: DynamicTitles.getTwelveDaysTitle(this.startDate),
    show: false,
    links: [
      {
        name: 'Wprowadzenie',
        show: false,
        links: [
          { image: 'assets/12dni/00.jpg',type:'foto' },
          { text: this.tvelveDay0, type:'opis', label: 'Wprowadzenie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia (online)', hidden: true },
          { url:'assets/12dni/Droga_Maryi_12_dni_wprowadzenie.mp3', type:'audio', label:'12 dni: Wprowadzenie' }
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
  title: DynamicTitles.getFirstWeekTitle(this.startDate),
  show: false, // opcjonalnie, żeby nie był od razu rozwinięty
  links: [
    {
        name: 'Wprowadzenie',
        show: false,
        links: [
          { image: 'assets/tydzien1/0.jpg',type:'foto' },
          { text: this.firstWeekDay0, type:'opis', label: 'Wprowadzenie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-pierwszy-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia (online)', hidden: true },
          { url:'assets/tydzien1/Droga_Maryi_tydzien_pierwszy_wprowadzenie.mp3', type:'audio', label:'tydz.1: Wprowadzenie' }
        ]
      },
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
  title: DynamicTitles.getSecondWeekTitle(this.startDate),
  show: false,
  links: [
        {
        name: 'Wprowadzenie',
        show: false,
        links: [
          { image: 'assets/tydzien2/0.jpg',type:'foto' },
          { text: this.secondWeekDay0, type:'opis', label: 'Wprowadzenie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-drugi-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia (online)', hidden: true },
          { url:'assets/tydzien2/Droga_Maryi_tydzien_drugi_wprowadzenie.mp3', type:'audio', label:'tydz. 2: Wprowadzenie' }
        ]
      },
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
  title: DynamicTitles.getThirdWeekTitle(this.startDate),
  show: false,
  links: [
        {
        name: 'Wprowadzenie',
        show: false,
        links: [
          { image: 'assets/tydzien3/0.jpg',type:'foto' },
          { text: this.thirdWeekDay0, type:'opis', label: 'Wprowadzenie' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/tydzien-trzeci-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia (online)', hidden: true },
          { url:'assets/tydzien3/Droga_Maryi_tydzien_trzeci_wprowadzenie.mp3', type:'audio', label:'tydz. 3: Wprowadzenie' }
        ]
      },
    {
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
  title: DynamicTitles.getDedicationDayTitle(this.startDate),
  show: false,
  links: [
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 42)}`,
        show: false,
        links: [  
          { image: 'assets/oddanie/1.jpg',type:'foto' },      
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 42)}`, this.oddanieDay0), type:'opis', label: 'Dzień oddania się Panu Jezusowi przez Maryję w Niewolę Miłości' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/dzien-oddania/audio', type:'audio', label:'audio (online)', hidden: true  },
          { url:'assets/oddanie/Droga_Maryi_dzien_oddania_sie_panu_Jezusowi_przez_Maryje_w_niewole_milosci.mp3', type:'audio', label:'Dzień oddania się Panu Jezusowi przez Maryję w Niewolę Miłości' },
          { text: this.prependDateFromName(`${this.getDatePlusDays(this.startDate, 42)}`, this.oddanieDayAkt), type:'opis', label: 'Akt oddania siebie Jezusowi Chrystusowi, Mądrości Wcielonej, przez ręce Maryi' },
          { url: 'assets/oddanie/akt.pdf',type:'pdf', label:'Pobierz Akt oddania (PDF)'}      
        ]
      }]
}
];

}