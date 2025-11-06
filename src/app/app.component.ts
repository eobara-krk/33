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
}
interface SingleLink {
  url: string;
  type?: string;
  label?: string;  // <-- dodajemy opcjonalne pole label
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
items: Item[] = [
  { 
    title: '27-10-2025 r. do 04-11-2025 r.  Nowenna do św. Ludwika', 
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
        name: '01: Czułe serce św. Ludwika',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-1', type:'html' }
        ]
      },
      {
        name: '02: Duchowe wzrastanie św. Ludwika i nasze',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-2', type:'html' }
        ]
      },
      {
        name: '03: Zaufanie Bogu',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-3', type:'html' }
        ]
      },
      {
        name: '04: Głosiciel Królestwa Jezusa przez Maryję',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-4', type:'html' }
        ]
      },
      {
        name: '05: Nauczyciel prawdziwego nabożeństwa do Maryi',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-5', type:'html' }
        ]
      },
      {
        name: '06: Miłość do Kościoła',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-6', type:'html' }
        ]
      },
      {
        name: '07: Apostoł Krzyża i Chrystusowego zwycięstwa',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-7', type:'html' }
        ]
      },
      {
        name: '08: Nauczyciel trwania w łasce',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-8', type:'html' }
        ]
      },
      {
        name: '09: Prowadzi nas do miłości do Jezusa',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/nowenna-do-sw-ludwika/dzien-9', type:'html' }
        ]
      }
    ]
  },
  { 
    title: '05-11-2025 r. do 16-11-2025 r.  12 dni – Wyzbycie się ducha tego świata', 
    show: false,
    links: [
      {
        name: 'Wprowadzenie',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie', type:'html', label:'tekst Wprowadzenia' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie/audio', type:'audio', label:'nagranie audio Wprowadzenia' }
        ]
      },
      {
        name: '01: 2025-11-05;  Odkryj łaskę Bożej miłości',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1', type:'html', label:'tekst Dnia 1' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1/audio', type:'audio', label:'nagranie audio Dnia 1' }
        ]
      },
      {
        name: '02: 2025-11-06;  Odkryj łaskę Bożej miłości',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2', type:'html', label:'tekst Dnia 2' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2/audio', type:'audio', label:'nagranie audio Dnia 2' }
        ]
      },
      {
        name: '03: 2025-11-07; Odkryj łaskę zbawienia',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3', type:'html', label:'tekst Dnia 3' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3/audio', type:'audio', label:'nagranie audio Dnia 3'  }
        ]
      },
      {
        name: '04: 2025-11-08; Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi',
        type: 'html',
        links: [
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4', type:'html', label:'tekst Dnia 4' },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4/audio', type:'audio', label:'nagranie audio Dnia 4' }
        ]
      }
    ]
  },

];

 private readonly summaryPassword = 'syn';

  // --- OTWIERANIE LINKÓW ---
openLink(linkOrGroup: SingleLink | SingleLink[]) {

  // jeśli to tablica linków → otwieramy pierwszy
  if (Array.isArray(linkOrGroup)) {
    if (linkOrGroup.length > 0) {
      window.open(linkOrGroup[0].url, '_blank');
    }
    return;
  }

  // jeśli to pojedynczy link → otwieramy jego
  if (linkOrGroup.url) {
    window.open(linkOrGroup.url, '_blank');
  }
}

// --- ROZWIJANIE EVENTÓW ---
toggle(obj: { show: boolean }) {
  obj.show = !obj.show;
}

  // --- CHRONIONE TEKSTY ---
toggleLink(group: LinkGroup) {
  // --- 1 link → zawsze otwieramy od razu ---
  if (group.links && group.links.length === 1) {
    window.open(group.links[0].url, '_blank');
    return;
  }

  // --- chronione hasłem ---
  if (group.protected) {
    if (group.show) {
      group.show = false;
      return;
    }
    const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
    if (password === this.summaryPassword) {
      group.show = true;
    } else {
      alert('Błędne hasło!');
    }
    return;
  }

  // --- normalne rozwijanie/zwijanie dla grup 0 lub >1 linków ---
  group.show = !group.show;
}

  trackByTitle(index: number, item: Item) {
    return item.title;
  }

trackByName(index: number, group: LinkGroup) {
  return group.name;
}


toggleImage(item: Item) {
  item.fullscreen = !item.fullscreen;
}

closePage() {
  // Próba zamknięcia okna
  window.close();

  // Jeśli okno nadal jest otwarte (np. nie zostało otwarte przez JS),
  // to przekieruj na pustą stronę
  setTimeout(() => {
    window.location.href = 'about:blank';
  }, 100);
}}