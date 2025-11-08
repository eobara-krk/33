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
          { image: 'assets/nowenna/01.jpg', type:'foto' },
          { text: `*Dzień pierwszy: Czułe serce św. Ludwika*

Św. Ludwik miał przedziwną drogę duchową, którą Bóg prowadził, a on wiernie jej był posłuszny.  
Miłość do Boga i bliźniego, szczególnie do tych w wielkiej potrzebie, była podstawą tej drogi.  

Już od dzieciństwa i pierwszego poruszenia sumienia, Ludwik był pociągnięty miłością do Boga.  
_„Dystansował się od swoich rówieśników by unikać ich zabaw, chował się, by modlić na różańcu przed obrazem Matki Bożej”_ – Ks. Blain, przyjaciel św. Ludwika.  

_Często wyglądał, jakby był w ciągłej ekstazie uczuciowej, porwany przez Boga. Nie mógł zapanować nad poruszeniami serca, które było przeniknięte Bożą miłością, i wzdychał przy stole, w rekreacji, wszędzie. Był to skutek gorliwych natchnień Bożej miłości w Duchu Świętym, który przenikał serce, by dać skosztować Jego słodyczy._  

Ta miłość do Boga i modlitwy była fundamentem jego świętej drogi do najwyższych szczytów modlitwy.  
Jako dojrzały kapłan i misjonarz pisał:  
_„O mój Boże, pragnę Cię kochać, zaczynam spalać się, Ty mnie zachwycasz. Dopuść mnie, by Cię kochać”_ (Pieśń 138,1).  

Równocześnie ze wzrastaniem miłości do Boga, w czułym sercu św. Ludwika wzrastała miłość do bliźniego.  
Pewnego dnia, gdy jeszcze był w Seminarium, jego matka odwiedziła biednych w bożnicy w św. Yves w Rennes.  
Jedna kobieta powiedziała: _„Twój syn, pani. To on mi znalazł to miejsce i doprowadził mnie tutaj”_.  

Ludwik z czułością przeżywał boleści bliźnich i przez nadzwyczajne czyny miłości zwyciężał tych, którzy zamykali serce na potrzeby drugiego.  
Przez całe życie podchodził do biednych z wiarą, widząc w nich Jezusa.  
Biedni nazywali go _„dobry ojciec Montfort”_.  

*Modlitwa*  
_Panie Boże nasz, św. Ludwik de Montfort całe swoje życie spędził, aby kochać Ciebie i bliźniego, a my tak mało realizujemy tę miłość.  
Przez jego wstawiennictwo pomóż nam pokonać nasze małoduszne serca i wszystko, co nam przeszkadza, aby naprawdę miłować.  
Usłysz naszą prośbę i przez jego wstawiennictwo daj nam czyste serca, abyśmy kochali miłością czystą.  
Prosimy Cię także o łaskę… (intencja, za którą się modlimy). Przez Chrystusa Pana naszego. Amen._  

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_  

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.
`
, label: 'Czułe serce św. Ludwika', type: 'opis', show: false } 
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 1)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/02.jpg',type:'foto' },
          { text: `*Dzień drugi: Duchowe wzrastanie św. Ludwika i nasze*

Św. Ludwik dał nam świadectwo, że osiągnął szczyt duchowego i mistycznego życia na ziemi, zjednoczenia z Chrystusem, którego nazywa Mądrością:  
_„W nowej rodzinie, do której należę, poślubiłem Mądrość i krzyż, tu jest cały mój skarb, w czasie i w wieczności, ziemski i niebieski, a jest on tak wielki, że kiedy zostałby poznany, mojemu losowi zazdrościliby najbogatsi i najmocniejsi królowie ziemi. Nikt nie zna tajemnicy, o której mówię, albo zna ją bardzo mało”_ (List 20).  

Św. Ludwik pisał do przyjaciela Blaina, że odczuwał trwałą obecność Jezusa i Maryi w swojej duszy.  
Montfort opisuje zjednoczenie z Maryją:  
_„Ta dobra matka i nauczycielka na każdym kroku mocno mnie wspomaga i kiedy przez słabości upadnę, Ona mnie zaraz podnosi. Oto, mówię wam, niepojmowana rzecz. Ja niosę w sobie Maryję, ale w cieniu wiary”_ (Pieśń 77,11-15).  

Św. Ludwik jasno przekazuje, że duchowość poświęcenia się prowadzi wąską drogą Ewangelii do uwolnienia od egoizmu i samolubstwa. Celem jest oczyszczenie i wzrastanie w miłości.  
Maryja prowadzi wiernych, którzy Jej się poświęcają, drogą większej i czystszej miłości.  
To droga umierania dla grzechu i samego siebie, a z drugiej strony – rodzenie nowego człowieka w Jezusie Chrystusie.  

W pieśni sama miłość mówi:  
_„Samolubstwo jest całkowicie przeciwne świętemu ogniu boskiej miłości, trzeba wszystko cierpieć i wszystko uczynić, by pokonać tę subtelną złośliwość. Aby płonąć Moim czystym płomieniem, aby kosztować Moje święte namaszczenie, musimy znienawidzić się aż do umartwienia. Mój zbawczy ogień gasi się wodą lekkich grzechów. Kto ich nie popełnia dobrowolnie, dojdzie do czystej miłości nieba”_ (Pieśń 5,29-31).  

Św. Ludwik chce prowadzić duszę do czystej miłości i zjednoczenia z Jezusem – Mądrością.  
Jest świadomy, że duchowość ta może być trudna do zrozumienia:  
_„Ponieważ istota tego nabożeństwa tkwi we wnętrzu człowieka, które ma ono kształtować, nie znajdzie ono jednakowego u wszystkich zrozumienia”_ (TPN n.119).  

Prawdziwa trudność nie polega na odmawianiu modlitw czy przynależności do bractwa, lecz na wniknięciu w ducha nabożeństwa, które ma uczynić duszę zależną od Najświętszej Maryi, a przez Nią – od Jezusa (TM n.44).  
Trzeba dbać o właściwą akceptację fundamentu tej duchowości: całkowite oddanie się Maryi, aby Ona prowadziła nas do zjednoczenia z Jezusem poprzez sytuacje i wydarzenia życia.  
Skutkiem takiej postawy jest duchowy dynamizm, trwający całe życie – dar Bożej łaski, nie tylko nasza praca.  

*Modlitwa*  
_Panie Boże nasz, przez swojego umiłowanego Syna, z łaski nas odkupiłeś i przyjąłeś jak swoje kochane dzieci, tak że możemy Cię nazywać Abba – Ojcze.  
Na wzór i za wstawiennictwem św. Ludwika uwolnij nasze serca od wszystkiego, co przeszkadza nam duchowo wzrastać i od tego, co Tobie nie jest miłe, abyśmy w duchu naprawdę żyli naszym synostwem w Synu, Tobie na chwałę.  
Usłysz naszą prośbę i przez wstawiennictwo św. Ludwika, daj nam, abyśmy nigdy nie wycofali się z tej duchowej drogi i wzrastania w wierze.  
Prosimy Cię także o łaskę… (intencja, za którą się modlimy). Przez Chrystusa Pana naszego. Amen._  

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_  

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.`
, label: 'Duchowe wzrastanie św. Ludwika i nasze', type: 'opis', show: false } 
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 2)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/03.jpg',type:'foto' },
          { text: `*Dzień trzeci: Zaufanie Bogu*

Ludwik zostawił swoją rodzinę i pojechał do Paryża, aby w Seminarium przygotować się do kapłaństwa. Po raz pierwszy poczuł się bardzo wolnym i odpowiedzialnym za swoje życie.  
Miał świadomość, że przed nim jeszcze wiele pokus i życiowych doświadczeń. Wybrał swoją drogę, opierając się tylko na Bogu i Jego Opatrzności.  

Pieniądze, które miał w kieszeni, i rzeczy przygotowane przez jego mamę na podróż oddał pierwszemu biednemu, którego spotkał po drodze. Trochę dalej, gdy spotkał innego żebraka, i nie miał już nic do oddania, zamienił się z nim na ubrania – oddał swój nowy strój, w zamian za jego stary i brudny.  

Wolny, nieposiadający nic na własność, Ludwik uczynił ślub całkowitego ubóstwa i ofiarowania się Bożej Opatrzności, ślub, którego przestrzegał do końca życia.  
Blain, jego przyjaciel i towarzysz na drodze formacji do kapłaństwa, zapisał:  
_„W tym czasie Ludwik bez miary oddaje się w ręce Bożej Opatrzności, z zaufaniem i spokojem, jakby ona całkowicie nad nim czuwała. Nawet torba pełna złota, która by go czekała w Paryżu, nie dałaby mu więcej pewności”_.  

Św. Ludwik przez całe życie zachował wielkie, całkowite i bezgraniczne zaufanie w Boga i Jego ojcowską opatrzność, mimo wewnętrznych i zewnętrznych trudności.  
Żył w skrajnym ubóstwie, często nierozumiany, odrzucony i prześladowany, w ciemnościach związanych z realizacją powołania i założeniem Zakonu.  
We wszystkim spokojnie oddawał się Bogu, Ojcu, który zawsze okazuje swoją obecność i troskę.  

Wyraża to w Pieśni 28:  
_„Dziwimy się Opatrzności, która wszystko prowadzi do celu, wszystko wie, wszystkim rządzi, mocno i łagodne ustawia wszystko, co do najdrobniejszej rzeczy. Cały wszechświat ją ujawnia, zawsze i wszędzie, cała ziemia jest pełna jej przedziwnego porządku: zmiany pór roku, obłoki na niebie, wszystko, co żyje, jest kierowane, by sobie wzajemnie pomagać.  
Bóg zna naszą biedę, On wie o naszych potrzebach, i jako dobry Ojciec troszczy się na tysiąc sposobów, by nam dać swoją pomoc.  
Złóżmy swoją nadzieję w Jego niezmierzoną dobroć. Złóżmy całkowitą nadzieję w Jego ojcowską miłość, bo On pragnie, byśmy od Niego oczekiwali także dóbr czasowych, dóbr przyrody, którymi się posługujemy na każdy dzień, jak odzież, pokarm i każda inna pomoc.  
Spróbujmy rozumieć tę wielką tajemnicę Zbawiciela, którą nas chce nauczyć przez swoją miłość: złóżcie nadzieję u wiernego Boga, odpocznijcie na piersi Jego ojcowskiej dobroci”_.

*Modlitwa*  
_Panie Boże nasz, św. Ludwik zawsze pokładał ufność w Twoją Ojcowską pomoc, a my wciąż za mało Tobie ufamy.  
Pomóż nam i przez wstawiennictwo św. Ludwika udziel nam łaski, byśmy mocno i ufnie wierzyli Tobie.  
Prosimy Cię także o łaskę… (intencja, za którą się modlimy). Przez Chrystusa Pana naszego. Amen._  

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_  

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.`
, label: 'Zaufanie Bogu', type: 'opis', show: false } 
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 3)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/04.jpg',type:'foto' },
          { text: `*Dzień czwarty: Głosiciel królestwa Jezusa Chrystusa przez Maryję*

Głoszenie Radosnej Nowiny, albo jak św. Ludwik mówił, *Królestwa Jezusa Chrystusa przez Maryję*, jest owocem i celem osobistego oraz kościelnego duchowego wzrastania.  
W jego fundamentach leży Jezusowe posłanie:  
_„Idźcie na cały świat i głoście Ewangelię wszelkiemu stworzeniu”_ (por. Mk 16,15).  

Apostolat jest ważnym elementem osobistego dojrzewania w wierze.  
Oznacza oczyszczenie duszy z grzechu, zaakceptowanie ewangelicznych wartości, pogłębianie relacji z Bogiem przez wiarę, nadzieję i miłość, świadectwo chrześcijańskiego życia, troskę i aktywne głoszenie Ewangelii oraz dzieła rozszerzenia Królestwa Bożego.  

Apostolski i misjonarski wymiar życia duchowego uwalnia wiernych od zamknięcia w sferze prywatności i intymności, co może być pokusą w osobistym życiu wiary.  
Apostolat rodzi się z autentycznej relacji z Chrystusem i jest owocem dojrzewania chrześcijańskiej miłości wobec Boga i człowieka.  

Św. Ludwik ostrzegał, że brak apostolskiego wymiaru jest znakiem niewłaściwej duchowej drogi:  
_„Wybrałem, aby iść przez świat, wybrałem duszę wędrowca, by zbawić mojego biednego bliźniego. Czy mam patrzeć, jak wszędzie dusza mojego drogiego brata zostaje zatracona przez grzech, a moje serce nie byłoby tym dotknięte? Nie, nie, Panie, jego dusza jest drogocenna. Czy będę patrzeć jak ta piękna dusza zapada w wieczną śmierć, a nikt na to nie reaguje? Czy będę patrzeć jak Krew Boga, który kocha tę duszę, będzie bezowocnie przelana, a jej wartość na zawsze zmarnowana? Raczej byłbym przeklęty. Ach, Panie, wszyscy Cię oskarżają w człowieku, który jest Twoim obrazem. Czy mam cierpieć w milczeniu? Twoi nieprzyjaciele zabierają Twoją chwałę, a ja miałbym być po ich stronie? Naprawdę, raczej śmierć! Z Tobą, Panie, ja zwyciężę”_ (Pieśń 22).  

Św. Ludwik był świadomy, że nieprzyjaciel dusz ludzkich walczył z nim w trakcie jego misji:  
_„Kiedy przyjadę do jakiegoś miejsca prowadzić misje, szatan używa wszystkich mocy, by przeszkadzać i niszczyć, ale ja przychodzę z Jezusem, Maryją i św. Michałem i zwyciężam go”_.  
Był głęboko świadomy duchowej walki dla nawrócenia i zbawienia dusz, która toczyła się przez całe jego życie misyjne.  

*Modlitwa*  
_Panie Boże nasz, św. Ludwik de Montfort całe swoje życie spędził, aby kochać Ciebie i bliźniego, a my tak mało realizujemy miłość na tej drodze.  
Przez jego wstawiennictwo pomóż nam pokonać nasze małoduszne serca i wszystko to, co nam przeszkadza, by naprawdę miłować.  
Usłysz naszą prośbę i przez jego wstawiennictwo daj nam serce czyste, pełne miłości.  
Prosimy Cię także o łaskę… (intencja, za którą się modlimy). Przez Chrystusa Pana Naszego. Amen._  

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_  

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.`
, label: 'Głosiciel królestwa Jezusa Chrystusa przez Maryję', type: 'opis', show: false } 
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 4)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/05.jpg',type:'foto' },
          { text: `*Dzień piaty: Nauczyciel prawdziwego nabożeństwa do Najświętszej Maryi Panny i duchowości ofiarowania się Jezusowi przez ręce Maryi*

Św. Ludwik już od dzieciństwa w modlitwie, z prostotą i mocą swojego czułego serca, z dziecięcym zaufaniem otwierał serce przed Maryją, Matką, którą nam dał Jezus.  

Blain, przyjaciel św. Ludwika, napisał:  
_„Wszyscy wiedzą, że on Maryję nazywał swoją dobrą Matką, ale nie wszyscy wiedzą, że już od dzieciństwa do Niej się uciekał z dziecinną prostotą, ofiarując jej wszystkie swoje potrzeby, tak czasowe, jak i duchowe. Kiedy stawał przed Maryjnym obrazem, zachowywał się, jakby nikogo już nie było obok niego. Do Niej się uciekał z wielkim zaufaniem i był pewny, że zostanie wysłuchany. Nigdy nie tracił pokoju, nie wątpił. Według niego wszystko już było załatwione, kiedy modlił się do swojej dobrej Matki”_.  

W nabożeństwie i poświęceniu się Maryi św. Ludwik trwał całe życie i tego nauczał innych. Fundament nabożeństwa do Maryi odnalazł w Ewangelii i woli Jezusa. Jezus pragnął ukierunkować duchową drogę swoich uczniów tak, żeby wcześniej czy później spotkali się z Maryją i obrali Ją za swoją Matkę.  

Św. Ludwik przyjął ten dar i polecił go innym:  
_„Wolę raczej umrzeć aniżeli żyć, nie należąc całkowicie do Maryi. Po tysiąckroć uznałem Ją za całe moje dobro, jak święty Jan Ewangelista u stóp Krzyża”_ (TM n.66).  
_„O, jakże szczęśliwy jest człowiek, co wszystko oddał Maryi, który się Maryi ze wszystkim i we wszystkim powierza i dla Niej zatraca. Całkowicie należy on już do Maryi, a Maryja do niego. Śmiało może on mówić z umiłowanym uczniem: Wziąłem Ją za całe moje dobro”_ (TPN n.179).  

Według św. Ludwika poświęcenie się Jezusowi przez Maryję jest doskonałym odnowieniem chrzcielnych przyrzeczeń. Każdy chrześcijanin powinien całkowicie poświęcić się Maryi, aby całkowicie być Jezusowym. To poświęcenie odwołuje się bezpośrednio do chrzcielnych przyrzeczeń i świadomego zaakceptowania obowiązków chrześcijańskiego życia, prowadząc duszę do wzrastania w wierze.  

Montfort pisze:  
_„Cała nasza doskonałość polega na tym, by upodobnić się do Jezusa Chrystusa, zjednoczyć się z Nim i Jemu się poświęcić, dlatego najdoskonalszym nabożeństwem jest bezsprzecznie to, które najwierniej upodobnia nas do Jezusa, najściślej z Nim jednoczy i poświęca nas wyłącznie Jemu. A ponieważ ze wszystkich ludzi najbardziej podobna do Jezusa jest Najświętsza Maryja Panna, stąd wynika, że spośród wszystkich innych nabożeństw, nabożeństwo do Najświętszej Maryi Panny najbardziej jednoczy z Panem Jezusem duszę naszą i sprawia, że staje się Jemu najbardziej podobna. Im bardziej dusza poświęcona jest Maryi, tym bliższa jest Panu Jezusowi. I dlatego doskonałe poświęcenie się Panu Jezusowi to nic innego, jak doskonałe i całkowite poświęcenie się Najświętszej Dziewicy. I takie właśnie jest nabożeństwo, które głoszę i które w istocie swej stanowi tylko doskonałe odnowienie ślubów i przyrzeczeń złożonych na Chrzcie św.”_ (TPN n.120).  

*Modlitwa*  
_Panie Boże nasz, Ty udzieliłeś św. Ludwikowi łaski prawdziwego nabożeństwa do Najświętszej Maryi i uczyniłeś go nauczycielem poświęcenia się Jezusowi przez Maryję.  
Przez jego wstawiennictwo udziel nam łaski, abyśmy byli formowani przez Najświętszą Maryję Pannę i żyli prawdziwym życiem chrześcijanina.  
Prosimy Cię także o łaskę…(intencja, za którą się modlimy). Przez Chrystusa Pana Naszego. Amen._  

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_  

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.`
, label: 'Nauczyciel prawdziwego nabożeństwa do Najświętszej Maryi Panny i duchowości ofiarowania się Jezusowi przez ręce Maryi', type: 'opis', show: false } 
        ]
      },
      {
        name: `06: ${this.getDatePlusDays(this.startDate, 5)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/06.jpg',type:'foto' },
          { text: `*Dzień szósty: Miłość do Kościoła*

Św. Ludwik, który przygotował się do kapłańskiej, misjonarskiej pracy z ludźmi,
żywił głębokie uczucia do Kościoła i rozumiał jego wymiar, który oznacza Naród
Boży, Królestwo Boże i misjonarskie posłanie Kościoła. Aby lepiej zrozumieć
ducha, który prowadził św. Ludwika, przytoczmy dwa teksty z jego życia.

Jako młody kapłan, po kilku miesiącach pastoralnego doświadczenia, pisał
swojemu kierownikowi duchowemu:  
_„Z drugiej strony, czuję wielkie pragnienie, aby rozszerzać miłość wobec
Pana i Jego świętej Matki, tak, żeby na prosty i ubogi sposób zacząć
ewangelizować biednych w wioskach i zachęcać grzeszników do nabożeństwa
do Najświętszej Maryi Panny (…) Ja z męką chcę uciszyć te dobre i ciągłe
pragnienie, całkowicie zapominając o mojej roli, zostawiając wszystko w rękach
Bożej Opatrzności i całkowicie poddając się Twoim nakazom, które mi będą
zawsze jak przykazanie”_ (List 5).

Pod koniec życia św. Ludwik tłumaczył swoje misjonarskie życie mądrością:
_„Jedna jest mądrość w osobach, które żyją we wspólnocie i według reguł,
inna jest mądrość misjonarza i apostolskich mężów (…) Drudzy to apostolscy
mężowie, którzy zawsze podejmują coś nowego (…) Św. Paweł przeszedł cały
grecki i łaciński świat, a św. Piotr poszedł do Rzymu (…)”_.

Św. Ludwik był świadomy, że grzech naznacza życie chrześcijan w Kościele:
_„Wspomnij, Panie, na tę Wspólnotę w wymiarze Twojej sprawiedliwości (…) 
Twój Kościół tak bardzo osłabiony i zbrukany zbrodniami jego dzieci”_ (MP n.5,20).

Podczas misji polecał odnowienie wiary przed Biblią, odnowienie chrzcielnych
przyrzeczeń i poświęcenie się Jezusowi przez Maryję:  
_„Skąd pochodzi to ogólne rozprzężenie moralne, jeśli nie stąd, że żyjemy
zapominając o obietnicach i zobowiązaniach Chrztu św. (…)”_ (TPN n.127).

*Modlitwa*  
_Panie Boże nasz, Ty chcesz, aby Twoje Królestwo rozszerzało się na cały
świat, dajesz nam swoje Słowo, które przynosi zbawienie. Ty św. Ludwikowi
udzieliłeś łaski głoszenia Słowa z odwagą i bez ustanku. Przez jego
wstawiennictwo udziel nam łaski, abyśmy to, co od Ciebie przyjęliśmy,
mogli dawać innym, by w ten sposób być Twoimi świadkami w świecie.  
Prosimy Cię także o łaskę…(intencja, za którą się modlimy).  
Przez Chrystusa Pana Naszego. Amen._

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.
`
, label: 'Miłość do Kościoła', type: 'opis', show: false }        
        ]
      },
      {
        name: `07: ${this.getDatePlusDays(this.startDate, 6)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/07.jpg',type:'foto' },
          { text: `*Dzień siódmy: Apostoł Krzyża i Chrystusowego zwycięstwa*

Życie duchowe wiąże się nierozerwalnie z duchowym pojmowaniem krzyża,
który każdy spotyka w swoim życiu. Posiadanie dojrzałego i zrównoważonego
stosunku wobec krzyża jest wielką sztuką duchową.

Św. Ludwik jest wielkim nauczycielem duchowości krzyża Chrystusowego
i pragnie formować nas, abyśmy naśladowali Chrystusa przez nasze krzyże.

Patrząc na krzyż, św. Ludwik mówił:  
_„Oto, jak sądzę, największa „tajemnica królewska”, największa tajemnica
Mądrości Przedwiecznej: to Krzyż. Och! Jakże bardzo myśli i drogi
Mądrości Przedwiecznej oddalone są i różne od myśli i dróg ludzkich,
nawet najmądrzejszych! (…) Jak niewysłowiona jest jednakowoż Jego
miłość do tego krzyża!”_ (MMP n.167,168)

Jezusowa męka i śmierć na krzyżu jest dowodem zbawczej miłości Syna Bożego,
który będąc w pełni wolny, ofiarowuje się dla naszego odkupienia.  
Św. Ludwik uczył:  
_„Pośród wszystkich argumentów, które mogą nas skłonić do miłowania
Jezusa Chrystusa, Mądrości Wcielonej – moim zdaniem –
najmocniejszy stanowią boleści, jakie zechciał On wycierpieć,
by dać nam dowód swojej miłości”_ (MMP n.154).

*Modlitwa*  
_Panie Boże nasz, Ty w swojej wszechmocnej Mądrości zapragnąłeś,
aby Twój Syn, Jezus Chrystus, zbawił ten świat przez śmierć na Krzyżu
i Zmartwychwstanie. Ty Boże, uczyniłeś św. Ludwika gorliwym apostołem
Krzyża Chrystusowego, który głosił Go przykładem i słowem.
Przez jego wstawiennictwo udziel nam łaski, aby dobrze nieść nasz krzyż,
naśladując Twojego Syna. Prosimy Cię także o łaskę…(intencja, za którą się modlimy).
Przez Chrystusa Pana Naszego. Amen._

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.`
, label: 'Apostoł Krzyża i Chrystusowego zwycięstwa', type: 'opis', show: false } 
        ]
      },
      {
        name: `08: ${this.getDatePlusDays(this.startDate, 7)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/08.jpg',type:'foto' },
          { text: `*Dzień ósmy: Nauczyciel trwania w łasce*

Z pastoralnego doświadczenia, jako misjonarz, Montfort był głęboko przekonany,
że wytrwałość jest wielkim problemem dusz ludzkich i dlatego zachęcał, by
zaakceptować duchowość poświęcenia się.

Problem wytrwania w dobrym jest bardzo istotny w życiu wiary. Obecne są w nim:
Boża łaska, ludzka wolność i kruchość ludzkiej natury, spowodowana przez
przeszłość, słabości i rany, przez negatywne działanie świata i szatana,
przez pokusy i wyobraźnię.

Abyśmy mogli zbierać owoce, musimy trwać w łasce, być wierni łasce Bożej.
Maryja, która była zawsze wierna i wytrwała, pomaga duszy, która Jej
się oddaje, aby trwała w wierności i w ten sposób przyniosła owoce.

Św. Ludwik zachęcał:  
_„Do owego nabożeństwa do Najświętszej Dziewicy zachęca nas skutecznie
ta okoliczność, iż stanowi ono cudowny środek wytrwania w cnocie i wierności.
Skąd bowiem bierze się to, iż większość nawróconych grzeszników nie potrafi
wytrwać? (…) Człowiek mówi do Maryi jak dziecko do matki, jak wierny sługa
do swej pani: strzeż depozytu wiary. Moja dobra Matko i Pani, uznaję, że
dotąd za Twoją przyczyną otrzymałem więcej łask od Pana Boga, niż na to
zasługiwałem (…) Jeśli Ty mnie podtrzymywać będziesz, nie upadnę;
jeśli Ty mnie osłaniać będziesz, uchronię się przed nieprzyjaciółmi”_ (TPN n.173).

*Modlitwa*  
_Panie Boże nasz, Ty nas powołujesz, abyśmy wytrwali na drodze wiary do końca życia.  
Przez wstawiennictwo Najświętszej Panny Maryi i św. Ludwika udziel nam łaski,
aby dobrze żyć, życiem prawdziwie chrześcijańskim i szczęśliwie umrzeć.
Prosimy Cię także o łaskę…(intencja, za którą się modlimy).
Przez Chrystusa Pana Naszego. Amen._

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.
`
, label: 'Nauczyciel trwania w łasce', type: 'opis', show: false } 
        ]
      },
      {
        name: `09: ${this.getDatePlusDays(this.startDate, 8)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/09.jpg',type:'foto' },
          { text: `*Dzień dziewiąty: Prowadzi nas do miłości do Jezusa*

Nabożeństwo do Maryi musi nas prowadzić do Jezusa Chrystusa. Jest to głębokie
przekonanie św. Ludwika, o którym wiele razy mówił. Na różne sposoby św. Ludwik
wyrażał tę centralną prawdę naszej wiary w Jezusa Chrystusa. Istotą każdej
duchowości, także i Maryjnej, jest fakt, że powinna ona prowadzić do Jezusa.

Św. Ludwik tak głosił, opierając się na Słowie Bożym:  
_„Jezus Chrystus, nasz Zbawiciel, prawdziwy Bóg i prawdziwy człowiek, musi
być ostatecznym celem wszelkiej naszej pobożności, inaczej byłaby ona fałszywa
i zwodnicza. (…) Gdyby nabożeństwo do Najświętszej Dziewicy oddalało nas od
Jezusa Chrystusa, trzeba by je odrzucić jako złudzenie szatańskie. Tymczasem
rzecz ma się przeciwnie (…) Nabożeństwo to jest konieczne, ale po to, by Jezusa
Chrystusa całkowicie znaleźć, ukochać Go i wiernie Mu służyć”_ (TPN n.61,62).

*Modlitwa*  
_Panie Boże nasz, Ty nas powołujesz, abyśmy wierzyli w Twojego Syna, Jezusa
Chrystusa i abyśmy Go miłowali. Przez wstawiennictwo Najświętszej Maryi Panny
i św. Ludwika udziel nam łaski prawdziwej miłości do Jezusa.  
Prosimy Cię także o łaskę…(intencja, za którą się modlimy).  
Przez Chrystusa Pana Naszego. Amen._

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_

Na koniec odmawiamy *Litanię do św. Ludwika de Montfort*.`
, label: 'Prowadzi nas do miłości do Jezusa', type: 'opis', show: false } 
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
        show: false,
        links: [
          { image: 'assets/wprowadzenie/01.jpg',type:'foto' },
          { text: `*Wprowadzenie*
  _„(...) powinni przynajmniej przez dwanaście dni pracować nad tym, by wyzbyć się ducha tego świata, sprzecznego z Duchem Jezusa Chrystusa”._

  św. Ludwik Maria Grignion de Montfort, Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny, 227

*Wprowadzenie* 
Na samym początku starajmy się zrozumieć, w jakim położeniu się znajdujemy. Można zobrazować to w następujący sposób: pierwsi ludzie, żyjąc w raju, funkcjonowali w atmosferze Bożego Ducha, byli przez całą dobę nieustannie zanurzeni w Bogu, oddychali Nim, On przenikał ich całych. Jednak po grzechu zmieniła się także atmosfera, w której żyli ludzie. Poza rajem inne było już ich środowisko naturalne. Musieli mierzyć się z konsekwencjami własnych grzechów, cierpieniem, śmiercią, oddaleniem od Boga. Można powiedzieć, że to był „duch tego świata” – pewna przestrzeń, w której człowiek żyje w oddzieleniu od Boga, gdzie sam musi sobie radzić ze wszystkimi trudnościami, które go spotykają. I właśnie w taką naszą rzeczywistość wszedł Chrystus – w świat, który jest dotknięty grzechem.

W przededniu męki, śmierci i zmartwychwstania, podczas swojej modlitwy do Ojca, Chrystus wypowiedział takie słowa: “Ja im przekazałem Twoje słowo, a świat ich znienawidził za to, że nie są ze świata, jak i Ja nie jestem ze świata. Nie proszę, abyś ich zabrał ze świata, ale byś ich ustrzegł od złego. Oni nie są ze świata, jak i Ja nie jestem ze świata. Uświęć ich w prawdzie. Słowo Twoje jest prawdą. Jak Ty Mnie posłałeś na świat, tak i Ja ich na świat posłałem” (J 17,14–18). „Tak bowiem Bóg umiłował świat, że Syna swego Jednorodzonego dał, aby każdy kto w Niego wierzy, nie zginął, ale miał życie wieczne” (J 3,16). A co zrobił ten świat z Synem Bożym? Ukrzyżował Go. Taka jest miłość Boga. I taka jest odpowiedź świata. Chrystus umarł i zmartwychwstał, wstąpił do nieba i zesłał Ducha Świętego. To wszystko otrzymaliśmy w chrzcie świętym. Przez chrzest zostaliśmy wyrwani z niewoli tego świata i staliśmy się dziećmi Bożymi. Jednak żyjąc na tym świecie jako dzieci Boże, przesiąkliśmy sposobem myślenia tego świata. Św. Jakub napisał: „Czy nie wiecie, że przyjaźń ze światem jest nieprzyjaźnią z Bogiem? Jeżeli więc ktoś zamierzałby być przyjacielem świata, staje się nieprzyjacielem Boga”(Jk 4,4). Życie w przyjaźni z Bogiem wyklucza przyjmowanie stylu i ducha świata zranionego grzechem, który jeszcze bardziej zachęca do grzechu. Potrzebujemy głębiej niż zwykle odkrywać, czym jest wielka łaska chrztu świętego. W momencie, w którym człowiek decyduje się na powrót do Boga przez decyzję oddania się Mu, odkrywa, jak bardzo jest przesiąknięty duchem tego świata. Bóg, przyjmując naszą decyzję o powrocie, chce nas obdarować pełnym błogosławieństwem i wolnością, dlatego potrzebujemy oczyszczenia ze wszystkiego, co jest jeszcze w nas z tego świata. Żyjemy nadal w tym świecie i Bóg nas do niego posyła, jednak nie mamy działać na sposób świata, lecz na Boży sposób. I każdy z nas indywidualnie potrzebuje wewnętrznie przejść tę drogę. Co to znaczy? Zło zakorzeniło się w nas głęboko – w naszych decyzjach, motywacjach, reakcjach, sposobie patrzenia. Potrzebujemy oczyszczenia naszych dusz, ponieważ wiele naszych słabości, które owocują grzechem, wynika świadomie lub nieświadomie z przyjętej mentalności świata, która jest przeciwna życiu wiary. Grzech skaził nasze wnętrza. Owocność naszego życia będzie zależała w dużej mierze od wierności i wysiłku, jaki włożymy w to, aby nie żyć duchem doczesności. Ponieważ nie można być prowadzonym jednocześnie przez ducha świata i przez Ducha Bożego. Pan Jezus mówi, że nie możemy służyć Bogu i mamonie. Jak mówi powiedzenie: z kim przystajesz, takim się stajesz. Żyjąc w świecie nasiąkamy współczesną mentalnością. To bardzo ważne, aby przyjrzeć się naszemu sposobowi myślenia, bo przecież nawrócenie to w istocie jego przemiana.

Najpierw chcemy przyjąć Dobrą Nowinę o Bogu, który nas kocha, odkupił nas, abyśmy potem jako wolni ludzie mogli podjąć walkę o to, by nie utracić tej wolności. Spójrzmy na to wszystko, co się stało w perspektywie oddania: Bóg, stwarzając świat, oddał nam władzę nad światem, oddał nam wszystko, włącznie ze swoją miłością. A my co z tym zrobiliśmy? Przez grzech oddaliśmy to diabłu, stając się niewolnikami grzechu, szatana i świata. Jednak Bóg nie pozostał obojętny na naszą niewolę grzechu. Bóg jako pierwszy oddał siebie samego Maryi. To w Niej stał się człowiekiem. Ona była Jego nowym rajem. Ona była mu w pełni oddana. Syn Boży stał się człowiekiem, zszedł na samo dno upodlenia i grzechu, choć sam grzechu nie popełnił. Ponieważ zapłatą za grzech jest śmierć, poniósł On śmierć za nasze grzechy, nabył nas swoją drogocenną krwią i oddał nas Bogu. Z wysokości krzyża oddał nam Maryję, abyśmy jak św. Jan Apostoł oddali się Jej, wzięli Ją do swojego życia, by Ona uczyła nas życia oddanego Bogu. Codziennie trzeba się uczyć od Niej oddawania naszego życia w różnych przestrzeniach, motywacjach i decyzjach. Chcemy, aby Ona była dla nas Mistrzynią życia duchowego, uczącą nas życia z Chrystusem. Ona, która spędziła z Nim 30 lat życia – poznała Go najlepiej. I jest wolą Chrystusa, w testamencie danym z krzyża, aby była naszą Matką.

Ona prowadzi nas po drogach otwierania naszych serc na Bożą miłość, abyśmy mogli odkrywać wielką łaskę chrztu świętego. Jej obecność i Imię jest dla nas osłodą! Jej czuła miłość jest naszym portem. Jej pragnienie szukania wszystkich zagubionych jest ogniem naszej gorliwości. Potrzeba nam zestrojenia serca z Niepokalanym Sercem Tej, która nigdy nie odmówiła Bogu niczego. Ona będzie prowadziła nas po drogach naszego oczyszczenia. Ona sama będzie uczyła nas uległości i zaufania na drogach, którymi codziennie prowadzi nas Bóg. Właśnie o to toczy się walka z duchem tego świata – aby nie wrócić za granicę, zza której zostaliśmy wyrwani. To cena naszej wolności. To nasze być albo nie być. Droga oczyszczenia z ducha tego świata nie zamyka się jednak w 12 dniach tych rekolekcji, chociaż wiele może się w tym czasie dokonać. Jednak istotniejsze jest to, abyśmy dowiedzieli się, jak walczyć z duchem tego świata i stali się bardziej czujni w naszej codzienności.

Istotę życia w przymierzu z Bogiem wyraził Chrystus w kazaniu na górze, w 8 błogosławieństwach. One są nowym prawem – już nie opartym na wypełnieniu przepisów, ale polegającym na odkrywaniu łaski w sytuacjach, na które ten świat nie da nam odpowiedzi. Tutaj właśnie przebiega front walki o wytrwanie przy Bogu.

Błogosławieni, o których mówi Jezus w kazaniu na górze, oznaczają szczęśliwych. Chrystus ma swoje błogosławieństwa, ale i świat ma swoje błogosławieństwa, jakże inne od tego, co mówi Chrystus. Chrystus ma swoją mądrość, ale i świat ma swoją mądrość. Św. Ludwik pisze, że: „Owa mądrość świata to całkowita uległość wobec światowych zasad i mody; to nieustanne dążenie do wielkości i uznania; ciągłe i sekretne poszukiwanie jego przyjemności i jego korzyści, nie w sposób ordynarny i krzykliwy, popełniając jakiś gorszący grzech, ale w sposób wyrafinowany, zwodniczy i dyplomatyczny; inaczej w oczach świata nie byłaby to mądrość, ale rozwiązłość. (...) Nigdy jeszcze świat nie był tak zepsuty jak teraz, ponieważ nigdy nie był tak wyszukany, tak mądry na swój sposób ani tak przebiegły. Tak zręcznie posługuje się prawdą, by podsunąć kłamstwo, cnotę, by usprawiedliwić grzech, a nawet słowami Jezusa Chrystusa, by usprawiedliwić własne słowa, że najwięksi mędrcy Boży często dają się im zwieść” (Miłość Mądrości Przedwiecznej, 75–79). Duch tego świata chce nas zwieść, oszukać i okraść z Bożego błogosławieństwa. Nikt z nas przecież nie chce być oszukiwany, dlatego przez kolejne dni pragniemy demaskować kłamstwa, którymi karmi nas mentalność tego świata, abyśmy żyli nie na sposób światowy, ale Boży. Chodzi też o to, że jeśli chcemy być w pełni chrześcijanami (tzn. podobni do Chrystusa), to musimy zapragnąć, aby nie było w nas cokolwiek ze sposobu życia tego świata, który przecież jest nieprzyjacielem Boga.

Chrystus mówi: „Nie proszę, abyś ich zabrał ze świata, ale byś ich ustrzegł od złego” (J 17,15). Jest w tym już uprzedzająca łaska Boża ustrzegająca nas od złego. To ochrona przed pokusą defetyzmu i droga do zwycięstwa. „A któż zwycięża świat, jeśli nie ten, kto wierzy, że Jezus jest Synem Bożym?” (1J 5,5). I choć słowo Boże mówi, że „cały zaś świat leży w mocy złego” (1J 5,19), to ostatecznie dobra nowina polega na tym, że Chrystus zachęca nas: “Na świecie doznajecie ucisku, ale odwagi! Jam zwyciężył świat!” (J 16,33).`
, label: 'Wprowadzenie', type: 'opis', show: false },

          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-wprowadzenie/audio', type:'audio', label:'audio Wprowadzenia' }
        ]
      },
      {
        name: `01: ${this.getDatePlusDays(this.startDate, 9)}`, // 9 dni po starcie nowenny
        show: false,
        links: [
          { image: 'assets/12dni/01.jpg',type:'foto'},
          { text: `*Dzień 1 - Odkryj łaskę Bożej miłości*

*Odkryj łaskę Bożej miłości*

*Modlitwa do Ducha Świętego*  
_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze  
prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie.  
Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie.  
Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia Bożej miłości. Amen!_

*Słowo Boże*  
_„Dlatego zginam kolana moje przed Ojcem, od którego bierze nazwę wszelki ród na niebie  
i na ziemi, aby według bogactwa swej chwały sprawił w was przez Ducha swego, by potężnie  
wzmocnił się wewnętrzny człowiek. Niech Chrystus zamieszka przez wiarę w waszych sercach;  
abyście w miłości zakorzenieni i ugruntowani, wraz ze wszystkimi świętymi zdołali ogarnąć  
duchem, czym jest Szerokość, Długość, Wysokość i Głębokość, i poznać miłość Chrystusa,  
przewyższającą wszelką wiedzę, abyście zostali napełnieni całą Pełnią Boga… Amen”_ (Ef 3,14–21).

*Rozważanie*  
Jaki naprawdę jest Bóg? Czasami mamy zdeformowane wyobrażenie o Nim – jak dziadek na chmurce,  
tyran, egzekutor, niedostępna energia… Zatrzymaj się i pomyśl – czy w twoim sercu też są echa tych wyobrażeń?  

Prawda o Bogu: _„i poznacie prawdę, a prawda was wyzwoli”_ (J 8,32). Apostoł Filip zapytał:  
_„Panie, pokaż nam Ojca”_ (J 14,8). Oto obraz Ojca w Biblii (Ps 139,1–18,24):  
Bóg przenika, zna, prowadzi, otacza swoją opieką, stworzył nas cudownie, pragnie dobra każdego,  
a Jego miłość przewyższa wszelką wiedzę.  

Bóg kocha każdego indywidualnie. Nawet gdybyś był jedynym mieszkańcem wszechświata,  
Bóg nie mógłby kochać cię bardziej niż teraz. _„Ukochałem Cię odwieczną miłością”_ (Jr 31,3).  
Bóg pierwszy nas ukochał i nadal kocha – wszystko, co robimy, jest odpowiedzią na Jego miłość.  

Bóg kocha grzesznika, bezwarunkowo i czule. Nie wymaga świętości ani perfekcji.  
Nie przestanie cię kochać – _„Bo góry mogą się poruszyć i pagórki się zachwiać,  
ale miłość moja nigdy nie odstąpi od ciebie!”_ (Iz 54,10).  

Bóg chce, abyś przyjął Jego miłość. To nie my doskakujemy do Boga – On schodzi do nas.  

*Lektura duchowa*  
_„Piękno przedwieczne pragnie przyjaźni z ludźmi i przygotowało księgę, by ją zdobyć…  
Wszyscy, którzy mnie znajdą, znajdą żywot i zbawienie od Pana… Kto mnie znajdzie, nie będzie się trudził, aby mnie znaleźć; bo znajdzie mnie siedzącą u drzwi swoich”_ (Prz 8,13b–15; 32–36).  

– św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 65–69

*Zadanie*  
_Przeżyję dzisiejszy dzień ze świadomością, że jestem kochany przez Boga bezwarunkowo._

*Modlitwa zawierzenia*  
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu,  
przez Maryję, Twoją świętą Matkę. Amen!_

`
 
, label: 'Odkryj łaskę Bożej miłości', type: 'opis', show: false },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-1/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 10)}`,
        show: false,
        links: [
          { image: 'assets/12dni/02.jpg',type:'foto' },
          { text: `*Dzień 2 - Odkryj łaskę poznania prawdy o grzechu*

*Odkryj łaskę poznania prawdy o grzechu*

*Modlitwa do Ducha Świętego*  
_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze  
prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie.  
Od wszelkiego zła, do wszelkiego złudzenia, od wszelkiego niebezpieczeństwa  
zachowaj mnie._

_Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia prawdy o grzechu! Amen!_

*Słowo Boże*  
_„A wąż był bardziej przebiegły niż wszystkie zwierzęta lądowe, które Pan Bóg  
stworzył. On to rzekł do niewiasty: «Czy rzeczywiście Bóg powiedział: Nie jedzcie  
owoców ze wszystkich drzew tego ogrodu?» Niewiasta odpowiedziała wężowi: «Owoce  
z drzew tego ogrodu jeść możemy, tylko o owocach z drzewa, które jest w środku ogrodu,  
Bóg powiedział: Nie wolno wam jeść z niego, a nawet go dotykać, abyście nie pomarli».  
Wtedy rzekł wąż do niewiasty: «Na pewno nie umrzecie! Ale wie Bóg, że gdy spożyjecie  
owoc z tego drzewa, otworzą się wam oczy i tak jak Bóg będziecie znali dobro i zło».  
Wtedy niewiasta spostrzegła, że drzewo to ma owoce dobre do jedzenia, że jest ono  
rozkoszą dla oczu i że owoce tego drzewa nadają się do zdobycia wiedzy. Zerwała zatem  
z niego owoc, skosztowała i dała swemu mężowi, który był z nią, a on zjadł. A wtedy  
otworzyły się im obojgu oczy i poznali, że są nadzy; spletli więc gałązki figowe i zrobili  
sobie przepaski”_ (Rdz. 3,1–6).

*Rozważanie*  
Prawda o Bożej miłości nie jest dla nas oczywista. Wielu mówi: życie to nie bajka, i  
rzeczywiście tak jest. Czasami rodzi się krzyk z serca: Boże, gdzie Ty jesteś?!  
Dlaczego na to wszystko pozwalasz?! Dlaczego nie doświadczam Bożej miłości na co dzień?  
Skąd biorą się wykrzywione wyobrażenia o Bogu? Skoro pragniemy miłości, to dlaczego  
jej nie wybieramy?  

Doświadczamy różnego rodzaju zła – skutki działań innych ludzi, chorób, wojny, śmierci,  
cierpienia. Są też nasze własne grzechy, często nieplanowane. „Nie czynię tego, co chcę,  
ale to, czego nienawidzę – to właśnie czynię” (Rz 7,15). Grzech nie pozwala doświadczać  
Bożej miłości i szczęścia.  

Księga Rodzaju obrazuje kuszenie przez szatana – kłamstwo, które ma zasiać wątpliwości,  
prowadząc człowieka do wizji bycia Bogiem, decydowania o dobru i złu. „Jak przez jednego  
człowieka grzech wszedł do świata, a przez grzech śmierć” (Rz 5,12).  

Osobowym źródłem grzechu jest szatan. „Diabeł, jak lew ryczący krąży szukając kogo pożreć”  
(1P 5,8). Był aniołem najbliżej Boga, sprzeciwił się Mu i walczy z nami. Nienawidzi nas,  
bo przypominamy mu Boga. Zwodzi nas, by oddzielić od Niego na życie wieczne.  

Grzech powoduje dystans do Boga. „Podobnie jak latorośl nie może przynosić owocu sama  
z siebie – jeśli nie trwa w winnym krzewie – tak samo i wy, jeżeli we Mnie trwać nie będziecie”  
(J 15,4b). Powoduje agresję czynna i bierną, oddziela od Boga, tworzy piekło w sercu.  
„Albowiem zapłatą za grzech jest śmierć” (R 6,23).  

Grzech zaburza spojrzenie na siebie i innych: podejrzliwość, obrona, walka, zamknięcie na  
miłość. Wewnętrzny oskarżyciel podsyca poczucie winy. Szukamy pocieszenia w grzechu,  
co prowadzi do spirali upadku.  

Świat wydaje się obcy, życie przeraża, rodzi się lęk przed przyszłością. Bóg kocha grzesznika,  
ale nie grzechu. Potrzebujemy pomocy, sami nie damy rady w relacji z Bogiem, sobą,  
innymi i światem.  

*Lektura duchowa*  
_„Wszystko w człowieku było jaśniejące, bez ciemności, piękne bez brzydoty, czyste bez brudu…  
Oto człowiek, który grzeszy, i grzesząc traci swą mądrość, niewinność, piękno, nieśmiertelność…  
Staje się niewolnikiem złych duchów, przedmiotem gniewu Boga, ofiarą piekieł! …  
Adam w tym stanie jest jakby pogrążony w rozpaczy; nie może otrzymać pomocy…  
Widzi Bożą sprawiedliwość, która ściga go i całe jego potomstwo; widzi Niebo zamknięte  
i otwarte piekło...”_

_– św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 38–40_

*Zadanie*  
_Spróbuję dziś dostrzec i uznać moją bezradność wobec zła i grzechu._

*Modlitwa zawierzenia*  
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu,  
przez Maryję, Twoją świętą Matkę. Amen!_ `
 
, label: 'Odkryj łaskę poznania prawdy o grzechu', type: 'opis', show: false },

          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-2/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 11)}`,
        show: false,
        links: [
          { image: 'assets/12dni/03.jpg',type:'foto' },
          { text: `*Dzień 3 - Odkryj łaskę zbawienia*
  
*Odkryj łaskę zbawienia*

*Modlitwa do Ducha Świętego*  
_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze  
prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie.  
Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa  
zachowaj mnie._

_Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę zbawienia. Amen!_

*Słowo Boże*  
_„Tak bowiem Bóg umiłował świat, że Syna swego Jednorodzonego dał, aby każdy,  
kto w Niego wierzy, nie zginął, ale miał życie wieczne. Albowiem Bóg nie posłał  
swego Syna na świat po to, aby świat potępił, ale po to, by świat został przez  
Niego zbawiony” (J 3,16–17)._

*Rozważanie*  
Stając wobec zła i grzechu, uświadamiając sobie ich realność, rozpaczliwie podejmujemy  
różne próby poradzenia sobie po ludzku i szukania zabezpieczenia przed tym, co nas przerasta.  

Niektórzy szukają zabezpieczenia w dobrach materialnych i mogą one do pewnego stopnia  
dać złudne poczucie bezpieczeństwa, bo rozwiązują część problemów, jednak w obliczu  
choroby czy śmierci okazują się bez wartości.  

Możemy także szukać schronienia w poczuciu bezpieczeństwa, które płynie z relacji z  
drugim człowiekiem. Gdy opieramy życie i szczęście od kogoś, to gdy ta osoba nas zrani,  
zawiedzie, odejdzie lub umrze, taka postawa okazuje się iluzją, która boleśniej rani.  

Rozwój nauki i techniki zdaje się niektórych tak uwodzić, że jedynego ratunku szukają  
w osiągnięciach człowieka. Są to dziedziny dynamiczne, ale nie eliminują zła i nie dają  
prawdziwego szczęścia – rozwiązując jedne problemy, stwarzają nowe.  

Można też próbować po ludzku zaprowadzić pokój i ład na świecie. Pomimo deklaracji  
o pokoju, ciągle wybuchają nowe konflikty, a osoby, które najgłośniej krzyczą o tolerancji,  
sami nie tolerują tych, którzy inaczej myślą.  

Człowiek, mając różne pragnienia duchowe, próbuje ukojenia w energiami, amuletach,  
„przedmiotach na szczęście”, filozofiach i medytacjach wschodnich, ale często są to iluzje,  
za którymi kryje się zły duch, by nas zwieść.  

Dla tradycyjnych katolików subtelniejsza pokusa – gorliwe praktyki religijne i posty,  
by wyrwać się z sideł grzechu. Kolejne niepowodzenia prowadzą do oskarżeń i wyrzutów  
sumienia. Najlepsze postanowienia czy uczynki nie są w stanie nas zbawić.  

Ponad tymi staraniami jest światło Dobrej Nowiny! Nasza nadzieja jest w Bogu. On nie jest  
obojętny na sytuację, w której się znaleźliśmy. To On wychodzi pierwszy – dał nam Syna.  
„Zapłatą za grzech jest śmierć” (Rz 6,23). Ktoś musiał umrzeć – On umarł zamiast ciebie.  

To jak kredyt niemożliwy do spłacenia: wszelkie pożyczki, długi – skazane na porażkę.  
I nagle ktoś mówi: biorę wszystkie twoje długi na siebie i nic w zamian nie chcę.  
Czy to możliwe? Tak! To Bóg w swoim odwiecznym zamyśle przygotował drogę odkupienia,  
niesamowitą jak samo dzieło stworzenia.  

„Wiemy też, że (Bóg) z tymi, którzy Go miłują, współdziała we wszystkim dla ich dobra”  
(Rz 8,28). Nawet z grzechu Bóg wyciągnął większe dobro. Po upadku ludzi w ogrodzie rajskim,  
Bóg zapowiedział zwycięstwo przez Niewiastę i Jej potomstwo. Maryja została Niepokalaną,  
by przez Nią przyszedł Syn Boży. Archanioł Gabriel powiedział Jej, że jest pełna łaski.  

Maryja wiedziała, że pełen łaski jest tylko Bóg. Pamiętała modlitwę Mojżesza:  
_„Jahwe, Jahwe, Bóg miłosierny i łagodny, nieskory do gniewu, bogaty w łaskę i wierność”_ (Wj 34,6).  

Najpierw Bóg dał człowiekowi miłość, ziemię i władzę nad światem. Gdy człowiek przez grzech  
oddaje to diabłu, Bóg przychodzi do Maryi i daje samego siebie. Maryja powiedziała „tak”,  
Bóg wcielił się – przyjął naszą naturę. Złączył się z ludźmi wszystkich czasów – także z tobą.  

Wziął na siebie twoje życie, ze wszystkimi radościami, smutkami, myślami, emocjami i przeżył je w  
wierności Ojcu w twoim imieniu. Tam, gdzie my mówimy „nie”, On mówi „tak”. Ta zgoda była tak  
radykalna, że zszedł na dno ludzkiego upodlenia. Cierpiał odrzucenie, niesłusznie oskarżano Go,  
wziął nasze grzechy i zło na krzyż. Chrystus zwyciężył zło, cierpiąc i wytrwawszy do końca.  

_„Lecz On był przebity za nasze grzechy”_ (Iz 53,5). Spełniło się proroctwo Izajasza:  
_„Ja, właśnie Ja przekreślam twe przestępstwa i nie wspominam twych grzechów”_ (Iz 43,25).  
Szatan, grzech i śmierć pokonane na krzyżu.  

_„Wiecie, że On objawił się po to, aby zgładzić grzechy (…) aby zniszczyć dzieła diabła”_ (1J 3,5–8).  
Na krzyżu Chrystus ukazał moc oddania: _„Wtedy Jezus zawołał donośny głosem: Ojcze, w Twoje ręce powierzam ducha mojego”_ (Łk 24,46).  

Krzyż stał się mostem nad przepaścią do Boga. Dzięki śmierci i Krwi Jezusa nie jesteśmy już  
wygnańcami, lecz usynowieni. Po trzech dniach Zmartwychwstanie – Chrystus daje wiarę, nowy  
życie, moc Ducha Świętego. Uczniowie wolni od lęku, smutku i rozpaczy, zaczęli głosić:  
_Chrystus zmartwychwstał i żyje!_

*Lektura duchowa*  
_„Mądrość Przedwieczna widząc, iż we wszechświecie nie ma nic, co byłoby zdolne  
zmazać grzech człowieka, uczynić zadość sprawiedliwości i uśmierzyć gniew Boga, a  
chcąc jednak uratować biednego człowieka, w którym miała upodobanie, znajduje sposób  
niezwykły. Ta łaskawa i najwyższa Księżniczka – zdumiewająca, niepojęta miłość – składa  
samą siebie w ofierze Ojcu, by zadośćuczynić Jego sprawiedliwości, ułagodzić gniew,  
wyrwać nas z niewoli złego ducha i z ogni piekielnych, wysłużyć szczęście wieczne.  
Jej ofiara zostaje przyjęta; rzecz postanowiona i rozstrzygnięta: Mądrość Przedwieczna  
inaczej Syn Boży stanie się człowiekiem we właściwym czasie i w określonych okolicznościach”._

_– św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 45–46_

*Zadanie*  
_Przeżyję dzisiejszy dzień w świadomości, że potrzebuję pomocy Jezusa i sam nie dam sobie rady._

*Modlitwa zawierzenia*  
_*Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu,  
przez Maryję, Twoją świętą Matkę. Amen!*_`
 
, label: 'Odkryj łaskę zbawienia', type: 'opis', show: false },
         { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-3/audio', type:'audio', label:'audio'  }
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 12)}`,
        show: false,
        links: [
          { image: 'assets/12dni/04.jpg',type:'foto' },
          { text: `*Dzień 4 - Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi*
  
*Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi*

*Modlitwa do Ducha Świętego*  
_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej  
drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem  
błogosław mnie. Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego  
niebezpieczeństwa zachowaj mnie._

_Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę nawrócenia i  
oddania życia Panu Jezusowi. Amen!_

*Słowo Boże*  
_„Dlatego, domu Izraela, będę was sądził, każdego według jego postępowania –  
wyrocznia Pana Boga. Nawróćcie się! Odstąpcie od wszystkich waszych grzechów,  
aby wam już więcej nie były sposobnością do przewiny. Odrzućcie od siebie wszystkie  
grzechy, które popełnialiście przeciwko Mnie, i uczyńcie sobie nowe serce i  
nowego ducha. Dlaczego mielibyście umrzeć, domu Izraela? Ja nie mam żadnego  
upodobania w śmierci – wyrocznia Pana Boga. Zatem nawróćcie się, a żyć będziecie”  
(Ez 18,30–32)._

*Rozważanie*  
Przez pierwsze trzy dni rozważaliśmy, jak nas Bóg ukochał, jak nas niszczy grzech  
i wpatrywaliśmy się w Jezusa, który jest Zbawicielem pokonującym grzech,  
śmierć i szatana. Z tej perspektywy widzimy, że zwycięstwo Jezusa jest dla nas  
wielkim darem, który jest zaproszeniem do odpowiedzi.  

Dziś jest czas podjęcia drugiej decyzji. Co z tym zrobisz? Jesteś wolny i możesz  
podjąć decyzję. Będzie ona miała swoje konsekwencje – w twoim życiu i w wieczności.  
Zrozumienie tego jest kluczowe.  

Po co mam coś zmieniać? Walka, która się rozgrywa, jest wewnątrz nas. Gdy zaczniemy  
czytać Księgę Rodzaju pod kątem historii grzechu, wtedy dostrzeżemy, jakie przestrzenie  
infekuje w nas szatan – Adam i Ewa nakłonieni do nieposłuszeństwa, Kain do zazdrości,  
budowniczy wieży Babel do pokusy samowystarczalności i niezależności od Boga,  
ludzie w czasach Noego kuszeni do bierności, by nic nie robić, nie podejmować decyzji.  

Dzisiejsza decyzja to przejście od religijności do wiary. Religijność to sposób przeżywania  
relacji z Bogiem, gdzie wypisuję listę rzeczy, o które chcę poprosić Boga, aby mi w nich  
pobłogosławił. To postawa, w której Bóg jest mi potrzebny do spełnienia moich zamiarów,  
pragnień, czasami nawet takich, które wydają się bardzo pobożne.  

Wiara to relacja, w której daję Bogu czystą kartkę, podpisuję ją swoim imieniem i mówię:  
_wypełnij ją jak chcesz, a ja Ci ufam, że mnie przez to wszystko przeprowadzisz_.  
Religijność może być martwą wiarą.  

Martwa wiara może wyglądać tak: bycie tzw. katolikiem tradycyjnym – przyjąłem wiarę od rodziców,  
ale nie była ona moim osobistym wyborem; „katolicyzm przepisowy” – najważniejsze przestrzeganie  
przykazań i zasad; „dobroludzizm” – wystarczy być dobrym człowiekiem, czynić dobro, pomagać,  
angażować się charytatywnie.  

Dzisiejszy dzień to zaproszenie do wyjścia z karykatur wiary i wejścia w ożywiającą relację z Bogiem,  
który ma moc wskrzesić to, co umarło w naszym życiu i napełnić nas prawdziwym życiem.  
Jezus mówił: _„Ja jestem drogą, prawdą i życiem” (J 14,6)_. Żyć naprawdę to żyć w relacji z Nim,  
to żywa wiara.  

Jezus, który pokonał śmierć, grzech i szatana, panuje nad wszystkim. Jemu wszystko jest poddane.  
Nad tym, co straciliśmy kontrolę, nic nie wymyka się spod Jego ręki. On jest Panem świata  
materialnego i duchowego, panuje nad złym duchem, chorobami, lękami, niepokojami.  

Bóg pokazuje nam dynamikę oddania. Najpierw On, stwarzając świat i człowieka, dał ludziom  
swoją miłość i obdarował ich dobrami. _„A Bóg widział, że wszystko, co uczynił, było bardzo dobre”_ (Rdz 1,31).  
Później, gdy ujawniła się bolesna prawda o grzechu i oddaniu się Bogu w niewolę diabła,  
Bóg dał nam siebie samego przez Maryję, a wszystko, co oddaliśmy w niewolę złego,  
Chrystus odkupił swoją Krwią.  

Gdy umierał na krzyżu, dał nam testament – swoją ostatnią wolę: _„Oto Matka Twoja”_ (J 19,27) –  
On oddaje nam Maryję, byśmy mogli, jak Jan Apostoł, wziąć Ją do siebie, do swojego życia.  
Ona, która najlepiej znała Jezusa i spędzała z Nim najwięcej czasu, może nauczyć prawdziwego życia  
oddanego Bogu i w Jego bliskości.  

To łaska wiary, przez którą możesz nawiązać więź z żywym Bogiem. Bóg realnie chce się z tobą spotkać  
i mieć żywą relację. Szuka Cię w twoim życiu przez różne sytuacje i wydarzenia. Dostrzegasz to?  
Słowo Boże mówi: _„My miłujemy [Boga], ponieważ Bóg pierwszy nas umiłował”_ (1 J 4,19),  
_„który umiłował mnie i samego siebie wydał za mnie. Nie mogę odrzucić łaski danej przez Boga”_  
(Ga 2,20–21). Na dar zbawienia nie można zasłużyć ani zapracować. Otrzymaliśmy go za darmo,  
z Bożej dobroci i hojności. Bóg jest dobry, daje łaskę wiary. Mogę ją przyjąć lub odrzucić.  
Jaka jest dziś moja decyzja?

*Lektura duchowa*  
_„Mądrość Przedwieczna jest głęboko poruszona nieszczęściem biednego Adama i całego jego potomstwa.  
Widzi ona i smuci się wielce, że chwalebne jej naczynie jest rozbite, wizerunek rozdarty,  
arcydzieło zniszczone, jej ziemski – namiestnik – upadły. Nakłania czule ucha ku jego jękom  
i wołaniom. Współczuje Ona widząc pot na jego czole, łzy w jego oczach, trud jego ramion,  
boleść serca i zgryzotę duszy.  

Wydaje mi się, że widzę tę łaskawą Panią, wzywającą i gromadzącą po raz drugi, by tak rzec,  
Trójcę Przenajświętszą, ażeby odnowić człowieka, tak jak już to była uczyniła, gdy go  
kształtowała (por. Rdz. 1,26). Zdaje mi się, że podczas tej wielkiej rady toczy się  
pewna walka między Mądrością Przedwieczną a Sprawiedliwością Bożą.  

Zdaje mi się, że słyszę ową Mądrość, jak w sprawie człowieka przekonuje, iż wprawdzie  
przez swój grzech zasługuje on wraz ze swym potomstwem na wieczne potępienie, tak jak  
zbuntowane anioły; ale że trzeba ulitować się nad niźli, ponieważ zgrzeszył bardziej przez  
słabość i niewiedzę niż przez złość. Mądrość zwraca uwagę, z jednej strony, iż wielką  
szkodą jest, by owo skończone arcydzieło pozostawało niewolnikiem swojego nieprzyjaciela  
na zawsze i żeby miliony ludzi z powodu grzechu jednego człowieka były na zawsze zgubione.  
Z drugiej strony, Mądrość wskazuje na miejsca w Niebie z powodu upadku zbuntowanych aniołów;  
dobrze byłoby je zapełnić. Wskazuje też na wielką chwałę, jaką Bóg będzie odbierał teraz i w wieczności”._

_– św. Ludwik Maria de Montfort, Miłość Mądrości Przedwiecznej, 41–43_

*Zadanie*  
_Przeżyję dzisiejszy dzień w ufności, że przez wszystko, co się w nim wydarzy,  
cokolwiek to będzie, Bóg chce mnie przeprowadzić._

*Modlitwa zawierzenia*  
_*Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu,  
przez Maryję, Twoją świętą Matkę. Amen!*_`
 
, label: 'Odkryj łaskę nawrócenia i oddania życia Panu Jezusowi', type: 'opis', show: false },
          { url:'https://drogamaryi.pl/edycje/5-listopada-2025/12-dni-dzien-4/audio', type:'audio', label:'audio' }
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 13)}`,
       show: false,
        links: [
          { image: 'assets/12dni/05.jpg',type:'foto' },
{ text: `*Dzień 5 - Błogosławieni ubodzy w duchu*

*Błogosławieni ubodzy w duchu*

*Modlitwa do Ducha Świętego*  
_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie. Od wszelkiego złego, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie. Maryjo, Oblubienico Ducha Świętego, wyproś mi dar ubóstwa w duchu._

_Amen!_

*Słowo Boże*  
_„Błogosławieni ubodzy w duchu, albowiem do nich należy królestwo niebieskie” (Mt 5,3)._

*Rozważanie*  
Odkąd opuściliśmy raj, powstała w nas pustka, którą może wypełnić tylko Bóg. Niestety, żyjąc wśród tego świata, szukamy wypełnienia tej przestrzeni.  
Świat przedstawia nam swoją propozycję i oszukuje, że przez zdobywanie dóbr, czy to zewnętrznych, czy wewnętrznych (różne przywiązania do naszych pragnień, wyobrażeń, sposobu myślenia), możemy osiągnąć wewnętrzne spełnienie.  

Duch tego świata okłamuje nas, mówiąc: _„możesz mieć w życiu wszystko”_.  
Masz w centrum swego istnienia postawić swe potrzeby i ciągle się realizować, zdobywając nowe rzeczy. To pokusa diabła, który staje przed Jezusem i mówi: _„Dam Ci wszystko, jeśli upadniesz i oddasz mi pokłon”_ (Mt 4,9).  

Na tym polega oszustwo i kłamstwo świata: szczęśliwy jest ten, kto jest bogaty, ma pieniądze i posiada wiele dóbr. Problem pojawia się, gdy coś nie wyjdzie.  

W pierwszej kolejności ubóstwo to świadoma zgoda, by nie być niewolnikiem tego, co posiadam. To droga wolności, w której mogę zadowolić się tym, co konieczne i rezygnować z rzeczy niepotrzebnych. Nie trzeba niepokoić się, jeśli coś stracę, co i tak nie jest niezbędne. To rezygnowanie z konsumpcyjnego stylu życia, w którym ciągle coś kupuję.  

Jednak ubóstwo to coś więcej.  
_Ubóstwo nie oznacza braku pieniędzy. To pewna postawa wewnętrzna_, w której chodzi o to, by wobec braków oprzeć się na Bogu i żyć świadomością, że wszystko mam u Niego. Jemu zależy, żeby nasze zubożenie stało się bogactwem!  
Ubóstwo jest lekarstwem od Boga, by wyleczył mnie z choroby polegania tylko na sobie. Ubóstwo leczy z przekonania, że nikt mi nie pomoże.  

Bez świadomości, że jesteśmy w rękach kochającego Boga, nie moglibyśmy przełknąć tego gorzkiego lekarstwa.  
Dlatego św. Paweł mówi: _„Przechowujemy zaś ten skarb w naczyniach glinianych, aby z Boga była owa przeogromna moc, a nie z nas”_ (2 Kor 4,7).  

Nosimy w sobie skarb Bożej Miłości, chociaż jesteśmy kruchymi, glinianymi naczyniami. To sytuacje niepowodzeń, cierpień i trudności pokazują, kim naprawdę jestem. Bolesne doświadczenia odsłaniają prawdę o mnie samym.  

Łatwo jest kochać Boga i ufać, gdy wszystko idzie po mojej myśli.  
W kryzysie wychodzi na jaw, na kim naprawdę polegam. Trudności się zdarzają – były, są i będą.  

Papierkiem lakmusowym życia w ubóstwie jest nieustanny wewnętrzny stan uwielbienia.  
_Dusza im bardziej uboga, tym bardziej żyje w uwielbieniu.  
Im dusza bardziej liczy na siebie, tym bardziej pyta: „za co uwielbiać Boga?”_  

Jeśli zdarzy się trudność, to od kogo oczekuję pomocy?  
Czy staję „pomimo” mojego ubóstwa przed Bogiem, wiedząc, że jestem w Jego rękach?  
Trudne sytuacje prowokują pytanie: czy jestem zdany na Boga we wszystkim, czy raczej na siebie?  
Czy zachowuję ufność w Bożą miłość, wierząc, że Bóg przeprowadzi mnie przez wszystko, czy szukam rozwiązań po swojemu?  
A jak reaguję w sukcesach? Czy oddaję wszystko Bogu, czy sobie?  

*Ubóstwo Maryi – Magnificat*  
_„Wielbi dusza moja Pana i raduje się duch mój w Bogu, moim Zbawcy”_ (Łk 1,46).  
Postawa Maryi pokazuje, że ubóstwo daje radość i prowadzi do uwielbienia. To postawa, w której człowiek nie uzależnia siebie od rzeczy, lecz od Boga.  

*Walka duchowa*  
Na czym polega? By być wpatrzonym w Boga, a nie w dobra materialne czy własne porażki.  
_Moja wartość nie zależy od tego, co posiadam, ani od sukcesów.  
Jeśli ktoś mnie pochwali – wartość ta sama.  
Jeśli ktoś skrytykuje – wartość ta sama.  
Jeśli poniosę porażkę – wartość ta sama._  

Duch świata mówi: _musisz sam sobie radzić_.  
Wiara mówi: _czyń, co możesz, ale ponad wszystko ufaj Bogu_.  

*Lektura duchowa*  
_„Aby mieć mądrość:  
1) Trzeba porzucić dobra świata lub oderwać serce od dóbr i posiadać je, jakby ich wcale się nie posiadało (por. 1 Kor 7,30);  
2) Nie wzorować się na modach ludzi światowych: w ubiorze, umeblowaniu, domach, posiłkach i zwyczajach. *Nolite conformari huic saeculo* (Rz 12,2).”_  

_– św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 197–198_

*Zadanie*  
_Poproszę Maryję, aby uczyła mnie żyć w zależności tylko od Boga._  

*Modlitwa zawierzenia*  
_*Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!*_`

 
, label: 'Błogosławieni ubodzy w duchu', type: 'opis', show: false },
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
      
      // Sformatuj tekst dla WhatsApp (markdown)
      const whatsappText = this.formatTextForWhatsApp(cleanText);
      
      // Tekst bez źródła - czysto dla WhatsApp
      let finalText = whatsappText;
      
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