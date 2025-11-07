import { Component } from '@angular/core';
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
  fullscreen?: boolean; // <-- dodajemy opcjonalne pole fullscreen
}
interface SingleLink {
  url?: string;
  type?: string;
  label?: string;  // <-- dodajemy opcjonalne pole label
  fullscreen?: boolean; // jeśli chcesz obsługiwać fullscreen dla linków
  image?: string; // 🆕 obrazek do wyświetlenia
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
export class AppComponent {
  currentDateTime: Date = new Date(); // <-- dodaj to
  fullscreenImage: string | null = null; // <-- globalny fullscreen


items: Item[] = [
  { 
    title: 'Nowenna do św. Ludwika', 
    show: false,
    links: [
      { 
        name: 'opis', 
        text: `BARDZO WAŻNYM etapem przygotowania do rekolekcji jest 9-dniowa nowenna do św. Ludwika Marii Grignion de Montfort.
(nowennę ofiarujmy w intencji naszego osobistego, całkowitego oddania swojego życie Panu Jezusowi przez Maryję)
Osoby, którym nie udało się rozpocząć nowenny 27 października zachęcamy, aby rozpoczęły ją w dowolnym dzień.`,
        show: false,
        protected: false,
        type: 'opis'
      },
      {
        name: '01: 2025-10-27',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-1', type:'html' }
        ]
      },
      {
        name: '02:  2025-10-28',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-2', type:'html' }
        ]
      },
      {
        name: '03: 2025-10-29',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-3', type:'html' }
        ]
      },
      {
        name: '04:  2025-10-30',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-4', type:'html' }
        ]
      },
      {
        name: '05: 2025-10-31',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-5', type:'html' }
        ]
      },
      {
        name: '06:  2025-11-01',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-6', type:'html' }
        ]
      },
      {
        name: '07:  2025-11-02',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-7', type:'html' }
        ]
      },
      {
        name: '08: 2025-11-03',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-8', type:'html' }
        ]
      },
      {
        name: '09:  2025-11-04',
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
        name: '01: 2025-11-05',
        show: false,
        links: [
          { image: 'assets/12dni/01.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1', type:'html', label:'Odkryj łaskę Bożej miłości' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: '02: 2025-11-06',
        show: false,
        links: [
          { image: 'assets/12dni/02.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2', type:'html', label:'Odkryj łaskę poznania prawdy o grzechu' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: '03: 2025-11-07',
        show: false,
        links: [
          { image: 'assets/12dni/03.jpg',type:'foto' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3', type:'html', label:'Odkryj łaskę zbawienia' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3/audio', type:'audio', label:'audio'  }
        ]
      },
      {
        name: '04: 2025-11-08',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4', type:'html', label:'Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: '05: 2025-11-09',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-5', type:'html', label:'Błogosławieni ubodzy w duchu' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-5/audio', type:'audio', label:'audio' }
        ]
      },
            {
        name: '06: 2025-11-10',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-6', type:'html', label:'Błogosławieni, którzy się smucą' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-6/audio', type:'audio', label:'audio' }
        ]
      },
            {
        name: '07: 2025-11-11',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-7', type:'html', label:'Błogosławieni cisi' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-7/audio', type:'audio', label:'audio' }
        ]
      },
            {
        name: '08: 2025-11-12',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-8', type:'html', label:'Błogosławieni, którzy łakną i pragną sprawiedliwości.' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-8/audio', type:'audio', label:'audio' }
        ]
      },
            {
        name: '09: 2025-11-13',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-9', type:'html', label:'Błogosławieni miłosierni' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-9/audio', type:'audio', label:'audio' }
        ]
      },
        {name: '10: 2025-11-14',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-10', type:'html', label:'Błogosławieni czystego serca' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-10/audio', type:'audio', label:'audio' }
        ]
      },
        {name: '11: 2025-11-15',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-11', type:'html', label:'Błogosławieni, którzy wprowadzają pokój' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-11/audio', type:'audio', label:'audio' }
        ]
      },
              {name: '12: 2025-11-16',
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
    if (!url) return;
    this.fullscreenImage = this.fullscreenImage === url ? null : url;
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
    const match = name.match(/\d{4}-\d{2}-\d{2}/);
    if (!match) return false;

    const date = new Date(match[0]);
    const today = new Date();

    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

  // ----------------------
  // OTWIERANIE TYLKO JEDNEJ GRUPY
  // ----------------------
  openOnly(groupToOpen: LinkGroup, item: Item) {
    item.links?.forEach(g => { if (g !== groupToOpen) g.show = false; });
    groupToOpen.show = !groupToOpen.show;
    if (groupToOpen.links?.length === 1) window.open(groupToOpen.links[0].url, '_blank');
  }

  // ----------------------
  // ZAMYKANIE STRONY
  // ----------------------
  closePage() {
    window.close();
    setTimeout(() => { window.location.href = 'about:blank'; }, 100);
  }
}