import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  currentDateTime: Date = new Date(); // <-- dodaj to
  fullscreenImage: string | null = null; // <-- globalny fullscreen
  private hasScrolledToToday: boolean = false; // Flaga czy już przewinięto do dzisiejszej daty

  // KONFIGURACJA DAT - tutaj ustawiasz datę startu
  private readonly startDate = new Date(2025, 9, 27); // 27 października 2025 (miesiące 0-11)
  
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
  private getDatePlusDays(startDate: Date, days: number): string {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + days);
    return this.getDayName(newDate);
  }

items: Item[] = [
  { 
    title: 'Nowenna do św. Ludwika', 
    show: false,
    links: [
      { 
        name: 'O Nowennie', 
        show: false,
        text: `BARDZO WAŻNYM etapem przygotowania do rekolekcji jest 9-dniowa nowenna do św. Ludwika Marii Grignion de Montfort (linki do dni nowenny znajdziecie poniżej)

Niech św. Ludwik przygotuje nasze serca do wejścia na tą wyjątkową drogę, DROGĘ MARYI, drogę doskonałego nabożeństwa do Matki Bożej, którą przeszli już przed nami między innymi: św. Jan Paweł II, bł. Kardynał Wyszyński, św. Maksymilian Kolbe...   

Zachęcamy Was do czytania Traktatu św. Ludwika. Można każdego dnia poświecić na to 5-10 minut. Święty Jan Paweł II czytał Traktat podczas przerw w pracy, kiedy jeszcze pracował jak młody człowiek. Jego papieskie zawołanie ”Totus Tuus” - Cały Twój, wzięło się wprost z dzieła świętego Ludwika. `,
        protected: false,
        type: 'opis'
      },
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 0)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/01.jpg',type:'foto' },
          { text: `*Dzień pierwszy: Czułe serce św. Ludwika*

Św. Ludwik miał przedziwną drogę duchową, którą go Bóg prowadził, a on wiernie był jej posłuszny. Miłość do Boga i bliźniego, szczególnie do tych, którzy byli w wielkiej potrzebie, były podstawą tej drogi. 

Już od dzieciństwa i pierwszego poruszenia jego sumienia, Ludwik był pociągniętym miłością do Boga. "Dystansował się od swoich rówieśników by unikać ich zabaw, chował się, by modlić na różańcu przed obrazem Matki Bożej".

Ks. Blain, przyjaciel św. Ludwika i kolega szkolny z okresu Seminarium napisał: "Często między nami wyglądał jakby w ciągłej ekstazie uczuciowej, wykluczony, porwany przez Boga. Nie mógł zapanować nad poruszeniami serca, które było przeniknięte Bożą miłością, i wzdychał przy stole, w rekreacji, wszędzie. Był to skutek gorliwych natchnień Bożej miłości w Duchu Świętym, który przenikał serce, by dać skosztować Jego słodyczy".

Ta miłość do Boga i modlitwy była fundamentem jego świętej, duchowej drogi do najwyższych szczytów modlitwy. Odkrywając swoje serce dla Boga, rozpalone miłością, jako dojrzały kapłan i misjonarz, zapisał: "O mój Boże, pragnę Cie kochać, zaczynam spalać się, Ty mnie zachwycasz. Dopuść mnie, by Cię kochać" (Pieśń 138,1).

Równocześnie ze wzrastaniem miłości do Boga, w czułym sercu św. Ludwika wzrastała miłość do bliźniego. Pewnego dnia, kiedy jeszcze był w Seminarium, matka Ludwika, Iwana, odwiedziła biednych w bożnicy w św. Yves w Rennes. Poznała jedną biedną kobietę i zapytała, kto ją tam wprowadził, a ona odpowiedziała: "Twój syn, pani. To on mi znalazł to miejsce i doprowadził mnie tutaj". Bez wątpienia, jego matka była szczęśliwa i dumna ze swojego syna.

Ludwik z czułością przeżywał boleści bliźnich i przez czyny miłości, które były nadzwyczajne, zwyciężał tych, którzy zamykali swoje serca na potrzeby drugiego. Przez całe swoje życie św. Ludwik podchodził do biednych z wiarą, przeżywając każde takie spotkanie jako przedłużenie swojej miłości do Jezusa w Eucharystii. Z tą samą czułością, miłością i gorliwością, którą okazywał na modlitwie, Ludwik przystępował do każdego biednego, w którym widział samego Jezusa. Biedni nazywali go "dobry ojciec Montfort".

*Modlitwa:*
Panie Boże nasz, św. Ludwik de Montfort całe swoje życie spędził, aby kochać Ciebie i bliźniego, a my tak mało realizujemy tę miłość. Przez jego wstawiennictwo pomóż nam pokonać nasze małoduszne serca i wszystko to, co nam przeszkadza, aby naprawdę miłować. Usłysz naszą prośbę i przez jego wstawiennictwo daj nam czyste serca, abyśmy kochali miłością czystą. Prosimy Cię także o łaskę...(intencja, za którą się modlimy). Przez Chrystusa Pana naszego. Amen.

Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu

Na koniec odmawiamy Litanię do św. Ludwika de Montfort

Źródło: https://drogamaryi.pl/litania-do-sw-ludwika`
, label: 'Czułe serce św. Ludwika', type: 'opis', show: false } 
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 1)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/02.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-2', type:'html', label:'Duchowe wzrastanie św. Ludwika i nasze' }
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 2)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/03.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-3', type:'html', label:'Zaufanie Bogu' }
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 3)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/04.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-4', type:'html', label:'Głosiciel królestwa Jezusa Chrystusa przez Maryję' }
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 4)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/05.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-5', type:'html', label:'Nauczyciel prawdziwego nabożeństwa do Najświętszej Maryi Panny i duchowości ofiarowania się Jezusowi przez ręce Maryi' }
        ]
      },
      {
        name: `06: ${this.getDatePlusDays(this.startDate, 5)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/06.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-6', type:'html', label:'Miłość do Kościoła' }
        ]
      },
      {
        name: `07: ${this.getDatePlusDays(this.startDate, 6)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/07.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-7', type:'html', label:'Apostoł Krzyża i Chrystusowego zwycięstwa ' }
        ]
      },
      {
        name: `08: ${this.getDatePlusDays(this.startDate, 7)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/08.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-8', type:'html', label:'Nauczyciel trwania w łasce' }
        ]
      },
      {
        name: `09: ${this.getDatePlusDays(this.startDate, 8)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-9', type:'html' }
        ]
      }
    ]
  },
  { 
    title: 'Wyzbycie się ducha tego świata 12 dni', 
    show: false,
    links: [
      {
        name: 'Wprowadzenie',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie', type:'html', label:'tekst Wprowadzenia' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia' }
        ]
      },
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 9)}`, // 9 dni po starcie nowenny
        show: false,
        links: [
          { image: 'assets/12dni/01.jpg',type:'foto'},
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1', type:'html', label:'Odkryj łaskę Bożej miłości' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 10)}`,
        show: false,
        links: [
          { image: 'assets/12dni/02.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2', type:'html', label:'Odkryj łaskę poznania prawdy o grzechu' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 11)}`,
        show: false,
        links: [
          { image: 'assets/12dni/03.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3', type:'html', label:'Odkryj łaskę zbawienia' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3/audio', type:'audio', label:'audio'  }
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 12)}`,
        show: false,
        links: [
          { image: 'assets/12dni/04.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4', type:'html', label:'Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 13)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-5', type:'html', label:'Błogosławieni ubodzy w duchu' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-5/audio', type:'audio', label:'audio' },
         { url:'assets/12dni/05dzien.mp3', type:'audio', label:'Ela' }
        ]
      },
      {
        name: `06: ${this.getDatePlusDays(this.startDate, 14)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-6', type:'html', label:'Błogosławieni, którzy się smucą' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-6/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `07: ${this.getDatePlusDays(this.startDate, 15)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-7', type:'html', label:'Błogosławieni cisi' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-7/audio', type:'audio', label:'audio' },
          { url:'assets/12dni/07dzien.mp3', type:'audio', label:'Ela' }
        ]
      },
      {
        name: `08: ${this.getDatePlusDays(this.startDate, 16)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-8', type:'html', label:'Błogosławieni, którzy łakną i pragną sprawiedliwości.' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-8/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `09: ${this.getDatePlusDays(this.startDate, 17)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-9', type:'html', label:'Błogosławieni miłosierni' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-9/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `10: ${this.getDatePlusDays(this.startDate, 18)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-10', type:'html', label:'Błogosławieni czystego serca' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-10/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `11: ${this.getDatePlusDays(this.startDate, 19)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-11', type:'html', label:'Błogosławieni, którzy wprowadzają pokój' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-11/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `12: ${this.getDatePlusDays(this.startDate, 20)}`,
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-12', type:'html', label:'Błogosławieni, którzy cierpią prześladowanie dla sprawiedliwości' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-12/audio', type:'audio', label:'audio' }
        ]
      },
    ]
  },

{
  title: 'Tydzień pierwszy - Poznanie samego siebie',
  show: false, // opcjonalnie, żeby nie był od razu rozwinięty
  links: []    // pusty array, brak linków na razie
},
{
  title: 'Tydzień drugi - Poznanie Najświętszej Maryi Panny',
  show: false,
  links: [] // brak linków
},
{
  title: 'Tydzień trzeci - Poznanie Jezusa Chrystusa',
  show: false,
  links: [] // brak linków
},
{
  title: '2025-12-08 Dzień oddania',
  show: false,
  links: [
      { 
        name: 'Akt oddania', 
        text: `akt oddania się Jezusowi przez Maryję według św. Ludwika Marii Grignion de Montfort`,
        show: false,
        protected: false,
        type: 'opis'
      }]
}

];


 private readonly summaryPassword = 'syn';

  // ----------------------
  // INICJALIZACJA - AUTOMATYCZNE OTWIERANIE DZISIEJSZYCH FOLDERÓW
  // ----------------------
  ngOnInit() {
    this.openTodayFolders();
    // Przewiń do dzisiejszego elementu po 2 sekundach (żeby użytkownik zdążył przeczytać header)
    setTimeout(() => {
      this.scrollToToday();
    }, 2000);
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
  toggle(obj: { show: boolean }) {
    obj.show = !obj.show;
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
    const today = new Date();
    today.setHours(0,0,0,0);

    return today >= start && today <= end;
  }

  isToday(name: string): boolean {
    if (!name) return false;
    
    // Sprawdzamy nowy format dd.MM.yyyy
    const newFormatMatch = name.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (newFormatMatch) {
      const [, day, month, year] = newFormatMatch;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
    }
    
    // Fallback na stary format YYYY-MM-DD (jeśli gdzieś jeszcze zostały)
    const oldFormatMatch = name.match(/\d{4}-\d{2}-\d{2}/);
    if (oldFormatMatch) {
      const date = new Date(oldFormatMatch[0]);
      const today = new Date();

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

    if (this.isAudioPlaying) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0; // Resetuj do początku
      this.isAudioPlaying = false;
    } else {
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
      // Konwertuj formatowanie na HTML
      .replace(/\*([^*]+)\*/g, '<strong>$1</strong>') // *tekst* → <strong>
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
      // Zachowaj formatowanie WhatsApp
      .replace(/\*([^*]+)\*/g, '*$1*') // *bold* dla WhatsApp
      .replace(/\n{3,}/g, '\n\n') // zmniejsz nadmierne nowe linie
      // Dodaj emotikony do sekcji
      .replace(/(\*Modlitwa:\*)/g, '\n🙏 $1')
      .replace(/(\*Dzień [^:]+:\*)/g, '📿 $1')
      // Kursywa dla cytatów
      .replace(/^"([^"]+)"$/gm, '_"$1"_')
      // Link źródła dodawany jest osobno w copyTextToClipboard()
      .replace(/Źródło: https?:\/\/[^\s<>]+/g, '');
  }

  // ZARZĄDZANIE WIDOCZNOŚCIĄ TEKSTU
  // ----------------------
  toggleTextVisibility(linkItem: any) {
    if (linkItem.type === 'opis') {
      linkItem.show = !linkItem.show;
    }
  }

  // KOPIOWANIE TEKSTU DO SCHOWKA Z FORMATOWANIEM WHATSAPP
  // ----------------------
  async copyTextToClipboard(text: string) {
    if (!text) {
      alert('Brak tekstu do skopiowania.');
      return;
    }

    try {
      // Wyczyść schowek przed kopiowaniem nowego tekstu
      try {
        await navigator.clipboard.writeText('');
        console.log('🧹 Schowek wyczyszczony');
      } catch (clearError) {
        console.warn('⚠️ Nie udało się wyczyścić schowka:', clearError);
      }
      
      // Usuń oryginalny link źródła z tekstu
      let cleanText = text.replace(/\n*Źródło: https?:\/\/[^\s<>]+\s*$/g, '');
      
      // Sformatuj tekst dla WhatsApp (markdown)
      const whatsappText = this.formatTextForWhatsApp(cleanText);
      
      // Dodaj źródło bez https:// (żeby WhatsApp nie robił podglądu)
      const finalText = whatsappText + '\n\n📖 Więcej na: drogamaryi.pl';
      
      // Skopiuj do schowka
      await navigator.clipboard.writeText(finalText);
      
      console.log('✅ Tekst skopiowany:', whatsappText.length, 'znaków');
      alert(`✅ Tekst został skopiowany do schowka!\n\nDługość: ${whatsappText.length} znaków\n\n📱 Możesz teraz wkleić go gdzie chcesz (np. WhatsApp, Messenger, SMS)`);
      
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