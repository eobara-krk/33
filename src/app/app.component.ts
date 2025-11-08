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

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Czułe serce św. Ludwika', type: 'opis', show: false } 
        ]
      },
      {
        name: `02: ${this.getDatePlusDays(this.startDate, 1)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/02.jpg',type:'foto' },
           { text: `*Dzień drugi: Duchowe wzrastanie św. Ludwika i nasze*

Św. Ludwik dał nam świadectwo tego, że osiągnął szczyt duchowego i mistycznego życia na ziemi, zjednoczenia z Chrystusem, którego nazywa Mądrością: „W nowej rodzinie, do której należę, poślubiłem Mądrość i krzyż, tu jest cały mój skarb, w czasie i w wieczności, ziemski i niebieski, a jest on tak wielki, że kiedy zostałby on poznany, mojemu losowi zazdrościliby najbogatsi i najmocniejsi królowie ziemi. Nikt nie zna tajemnicy, o której mówię, albo zna ją bardzo mało”. (List 20). Św. Ludwik pisał do swojego przyjaciela Blaina, że odczuwał trwałą obecność Jezusa i Maryi w swojej duszy. Montfort wyjaśnia charakterystykę tego mistycznego zjednoczenia się z Maryją w pieśni: „Ta dobra matka i nauczycielka na każdym kroku mocno mnie wspomaga i kiedy przez słabości upadnę, Ona mnie zaraz podnosi. Oto, mówię wam, niepojmowana rzecz. Ja niosę w sobie Maryję, ale w cieniu wiary”. (Pieśń 77,11-15). Św. Ludwik jasno przekazuje, że jeżeli ktoś naprawdę w autentyczny sposób chce żyć duchowością poświęcenia się, której on naucza, to duchowość ta poprowadzi go wąską drogą ewangelii do uwolnienia od egoizmu i samolubstwa. Celem jest oczyszczenie i wzrastanie w miłości. Naprawdę, Maryja, wiernych, którzy Jej się poświęcają, prowadzi drogą większej i czystszej miłości. Taka jest ta droga, z jednej strony - umieranie dla grzechu i dla samego siebie, a z drugiej strony - przemienianie i rodzenie nowego człowieka w Jezusie Chrystusie. W pieśni sama miłość mówi o sobie: „Samolubstwo jest całkowicie przeciwne świętemu ogniu boskiej miłości, trzeba wszystko cierpieć i wszystko uczynić, by pokonać tę subtelną złośliwość. Aby płonąć Moim czystym płomieniem, aby kosztować Moje święte namaszczenie, musimy znienawidzić się aż do umartwienia. Mój zbawczy ogień gasi się wodą lekkich grzechów. Kto ich nie popełnia dobrowolne, dojdzie do czystej miłości nieba”. (Pieśń 5,29-31). Św. Ludwik drogą, którą sam przeszedł, chce prowadzić duszę do czystej miłości i zjednoczenia się z Jezusem - Mądrością. Jest on świadomy tego, że może nie być łatwo zrozumieć i przyjąć znaczenie i istotę tej duchowości. „Ponieważ istota tego nabożeństwa tkwi we wnętrzu człowieka, które ma ono kształtować, nie znajdzie ono jednakowego u wszystkich zrozumienia”. (TPN n.119). Nie trzeba wielkiego trudu, by zapisać się do jakiegoś bractwa, odmawiać co dziennie kilka różnych modlitw; lecz prawdziwą trudność stanowi wniknięcie w ducha tego nabożeństwa, które ma wewnętrznie uczynić duszę niewolniczo zależną od Najświętszej Dziewicy, a przez Nią – od Jezusa”. (TM n.44). Aby prawdziwie zrozumieć i żyć na co dzień duchem poświęcenia się Jezusowi przez Maryję, trzeba ponad wszystko dbać o właściwą akceptację fundamentu tej duchowości, który polega na całkowitym oddaniu się Maryi, aby  to Ona prowadziła nas drogą do zjednoczenia się z Jezusem poprzez sytuacje i wydarzenia naszego życia. Trzeba czuwać nad wewnętrznym duchem tego ofiarowania się, akceptując drogę umierania  dla grzechu i samolubstwa, abyśmy duchowo wzrastali i dojrzewali, akceptując wszystkie potrzebne i konieczne narzędzia duchowego życia, abyśmy drogą czystej miłości doszli do zjednoczenia się z Jezusem. Skutkiem takiej postawy jest duchowy dynamizm, który trwa całe życie. Jego realizacja nie zależy tylko od naszej pracy, ale jest to także dar Bożej łaski.

*Modlitwa:* 
Panie Boże nasz, przez swojego umiłowanego Syna, z łaski nas odkupiłeś i przyjąłeś nas jak swoje kochanie dzieci, tak, że możemy Cię nazywać Abba – Ojcze. Na wzór i za wstawiennictwem św. Ludwika uwolnij nasze serca od wszystkiego, co przeszkadza nam duchowo wzrastać i od tego, co Tobie nie jest miłe, abyśmy w duchu naprawdę żyli naszym synostwem w Synu, Tobie na chwałę. Usłysz naszą prośbę i przez wstawiennictwo św. Ludwika, daj nam, abyśmy nigdy nie wycofali się z tej duchowej drogi i wzrastania w wierze. Prosimy Cię także o łaskę…(intencja, za którą się modlimy. Przez Chrystusa Pana naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Duchowe wzrastanie św. Ludwika i nasze', type: 'opis', show: false } 
        ]
      },
      {
        name: `03: ${this.getDatePlusDays(this.startDate, 2)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/03.jpg',type:'foto' },
          { text: `*Dzień trzeci: Zaufanie Bogu*
Ludwik zostawił swoją rodzinę i pojechał do Paryża, aby w Seminarium przygotować się do kapłaństwa. Pierwszy raz poczuł się bardzo wolnym i odpowiedzialnym za swoje życie. Miał świadomość, że przed nim jeszcze wiele pokus i życiowych doświadczeń. Wybrał swoją drogę, opierając się tylko na Bogu i Jego opatrzności. Pieniądze, które miał w kieszeni, i rzeczy przygotowane od swojej mamy na podróż oddał pierwszemu biednemu, którego spotykał po drodze. Trochę dalej,  gdy spotkał innego biednego żebraka, i nie miał już niczego do oddania, zamienił się z nim na ubrania - oddał mu swój nowy strój, w zamian za jego stary i brudny. Wolny, nie posiadający nic na własność, Ludwik uczynił ślub całkowitego ubóstwa i ofiarowania się Bożej Opatrzności, ślub, którego całkowicie przestrzegał do końca swojego życia. Blain, towarzysząc swojemu przyjacielowi na drodze formacji do kapłaństwa, zapisał: „W tym czasie Ludwik bez miary oddaje się w ręce Bożej Opatrzności, z zaufaniem i spokojem, jakby ona całkowicie nad nim czuwała. Nawet torba pełna złota, która by go czekała w Paryżu, nie dałaby mu więcej pewności”. Św. Ludwik w ciągu całego swojego życia zachował wielkie, całkowite i bezgraniczne zaufanie w Boga i Jego ojcowską opatrzność. Został osobiście doświadczony wieloma wewnętrznymi i zewnętrznymi trudnościami. Żył w skrajnym ubóstwie, często nierozumiany przez innych, odrzucony i prześladowany, w wewnętrznych i zewnętrznych ciemnościach związanych z realizacją swojego misjonarskiego powołania i założenia Zakonu. Ale we wszystkim zawsze spokojnie oddawał się z całkowitym zaufaniem Bogu, jak sam mówił, Ojcu, który zawsze okazuje swą obecność i troskę. Właśnie to św.Ludwik wyraża w jednej ze swoich pieśni: „Dziwimy się Opatrzności, która wszystko prowadzi do celu, wszystko wie, wszystkim rządzi, mocno i łagodne ustawia wszystko, co do najdrobniejszej rzeczy. Cały wszechświat ją ujawnia, zawsze i wszędzie, cała ziemia jest pełna jej przedziwnego porządku: zmiany pór roku, obłoki na niebie, wszystko, co żyje, jest kierowane, by sobie wzajemnie pomagać. Ta mądrość jest rozciągnięta z jednego krańca do drugiego, jednym mrugnięciem oka, jednym spojrzeniem wszystko poznaje i uporządkowuje. Bóg zna naszą biedę, On wie o naszych potrzebach, i jako dobry nasz Ojciec, troszczy się na tysiąc sposobów, by nam dać swoją pomoc. Złóżmy swoją nadzieję w Jego niezmierzoną dobroć. Złóżmy całkowitą nadzieję w Jego ojcowską miłość, bo On pragnie, byśmy od niego oczekiwali także dóbr czasowych, dóbr przyrody, którymi się posługujemy na każdy dzień, jak odzież, pokarm i każda inna pomoc. Spróbujmy rozumieć tą wielką tajemnicę Zbawiciela, którą nas chce nauczyć przez swoją miłość: złóżcie nadzieję u wiernego Boga, odpocznijcie na piersi jego ojcowskiej dobroci”. (Pieśń 28). 

*Modlitwa:* 
Panie Boże nasz, św. Ludwik zawsze pokładał ufność w Twoją Ojcowską pomoc, a my wciąż za mało Tobie ufamy. Pomóż nam i przez wstawiennictwo św. Ludwika, udziel nam łaski, byśmy mocno i ufnie wierzyli Tobie. Prosimy Cię także o łaskę… (intencja, za którą się modlimy). Przez Chrystusa Pana naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Zaufanie Bogu', type: 'opis', show: false } 
        ]
      },
      {
        name: `04: ${this.getDatePlusDays(this.startDate, 3)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/04.jpg',type:'foto' },
          { text: `*Dzień czwarty: Głosiciel królestwa Jezusa Chrystusa przez Maryję*
Głoszenie Radosnej Nowiny albo, jak św. Ludwik lubił mówić, Królestwa Jezusa Chrystusa przez Maryję, pojawia się jako owoc i cel osobistego i kościelnego duchowego wzrastania, a w jego fundamentach leży Jezusowe posłanie: „Idźcie na cały świat i głoście Ewangelię wszelkiemu stworzeniu” (por. Mk 16,15).  Apostolat jest ważnym elementem osobistego dojrzewania w wierze. To znaczy, że oczyszczenie duszy z grzechu i zaakceptowanie ewangelicznych wartości, pogłębienie relacji z Bogiem przez wiarę, nadzieję i miłość, świadectwo chrześcijańskiego życia, troska i aktywne głoszenie Ewangelii, oraz dzieła rozszerzenia Królestwa Bożego, wszystko to jest częścią autentycznego duchowego wzrastania. Apostolski i misjonarski wymiar rozwoju duchowego życia uwalnia wiernych od zamknięcia duchowej drogi w sferze prywatności i intymności, co może pojawić się jako pokusa w osobistym życiu wiary. Apostolat razem z modlitwą rodzi się z autentycznej relacji z Chrystusem. Apostolat jest owocem dojrzewania autentycznej chrześcijańskiej miłości wobec Boga i człowieka, która nakłania wiernych, by zobaczyć potrzebę bliźniego i zachęca, by apostolsko świadczyć Bożą miłość. Według św. Ludwika, brak apostolskiego wymiaru jest znakiem niewłaściwej osobistej drogi wzrastania w wierze: „Wybrałem, aby iść przez świat, wybrałem duszę wędrowca, by zbawić mojego biednego bliźniego. Czy mam patrzeć, jak wszędzie dusza mojego drogiego brata zostaje zatracona przez grzech, a moje serce nie byłoby tym dotknięte? Nie, nie, Panie, jego dusza jest drogocenna. Czy będę patrzeć jak ta piękna dusza zapada w wieczną śmierć, a nikt na to nie reaguje? Czy będę patrzeć jak Krew Boga, który kocha tę duszę, będzie bezowocnie przelana, a jej wartość na zawsze zmarnowana? Raczej byłbym przeklęty. Ach, Panie, wszyscy Cię oskarżają w człowieku, który jest Twoim obrazem. Czy mam cierpieć w milczeniu? Twoi nieprzyjaciele zabierają Twoja chwalę, a ja miałbym być po ich stronie? Naprawdę, raczej śmierć! Z Tobą, Panie, ja zwyciężę” (Pieśń 22). Św. Ludwik był świadomy, że nieprzyjaciel dusz ludzkich walczył z nim w trakcie głoszenia przez niego misji: „Kiedy przyjadę do jakiegoś miejsca prowadzić misje, szatan używa wszystkich mocy, by przeszkadzać i niszczyć, ale ja przychodzę z Jezusem, Maryją i św. Michałem i zwyciężam go”. Św. Ludwik był głęboko świadomy tej duchowej walki dla nawrócenia i zbawienia dusz, która się toczyła w jego życiu w ciągu wszystkich jego misji.

*Modlitwa:* 
Panie Boże nasz, św. Ludwik de Montfort całe swoje życie spędził, aby kochać Ciebie i bliźniego, a my tak mało realizujemy miłość na tej drodze. Przez jego wstawiennictwo pomóż nam pokonać nasze małoduszne serca i wszystko to, co nam przeszkadza, by naprawdę miłować. Usłysz naszą prośbę i przez jego wstawiennictwo daj nam serce czyste, pełne miłości. Prosimy Cię także o łaskę…(intencja, za która się modlimy). Przez Chrystusa Pana Naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Głosiciel królestwa Jezusa Chrystusa przez Maryję', type: 'opis', show: false } 
        ]
      },
      {
        name: `05: ${this.getDatePlusDays(this.startDate, 4)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/05.jpg',type:'foto' },
          { text: `*Dzień piaty: Nauczyciel prawdziwego nabożeństwa do Najświętszej Maryi Panny i duchowości ofiarowania się Jezusowi przez ręce Maryi*
Św. Ludwik już od dzieciństwa w swojej modlitwie, z prostotą i mocą swojego czułego serca, z dziecięcym zaufaniem otwierał swoje serce przed Maryją, Matką, którą nam dał Jezus. Blain, przyjaciel św. Ludwika, napisał: „Wszyscy wiedzą, że on Maryję nazywał swoją dobra Matką, ale nie wszyscy wiedzą, że już od swojego dzieciństwa do Niej się uciekał z dziecinną prostotą, ofiarując jej wszystkie swoje potrzeby, tak czasowe, jak i duchowe. Kiedy stawał przed Maryjnym obrazem, zachowywał się, jakby nikogo już nie było obok niego. Do Niej się uciekał z wielkim zaufaniem i był pewny, że zostanie wysłuchany. Nigdy nie tracił pokoju, nie wątpił. Według niego wszystko już było załatwione, kiedy modlił się do swojej dobrej Matki”. W nabożeństwie i poświęceniu się Maryi św. Ludwik trwał całe swoje życie i tego nauczał innych. Fundament nabożeństwa do Maryi odnalazł w Ewangelii i woli Jezusa. Jezus pragnął ukierunkować duchową drogę swoich uczniów tak, żeby wcześniej czy później spotkali się z Maryją i obrali Ją za swoja Matkę. Maryja jest Jezusowym darem dla uczniów, który trzeba zaakceptować w swoim duchowym życiu. Św. Ludwik przyjął ten dar i polecił go innym: „Wolę raczej umrzeć aniżeli żyć, nie należąc całkowicie do Maryi. Po tysiąckroć uznałem Ją za całe moje dobro, jak święty Jan Ewangelista u stóp Krzyża” (TM n.66). „O, jakże szczęśliwy jest człowiek, co wszystko oddał Maryi, który się Maryi ze wszystkim i we wszystkim powierza i dla Niej zatraca. Całkowicie należy on już do Maryi, a Maryja do niego. Śmiało może on mówić z umiłowanym uczniem: Wziąłem Ją za całe moje dobro” (TPN n.179). Według św. Ludwika, poświęcenie się Jezusowi przez Maryję jest doskonałym odnowieniem chrzcielnych przyrzeczeń. Poleca on także, aby każdy chrześcijanin całkowicie poświęcił się Maryi, aby całkowicie był Jezusowym. To poświęcenie odwołuje się bezpośrednio do chrzcielnych przyrzeczeń i świadomego zaakceptowania obowiązków chrześcijańskiego życia i prowadzi osobę do wzrastania w wierze. Maryja, która zawsze była wierna Bogu, pomaga na tej drodze duszy, która się Jej poświęca. Montfort pisze: „Cała nasza doskonałość polega na tym, by upodobnić się do Jezusa Chrystusa, zjednoczyć się z Nim i Jemu się poświęcić, dlatego najdoskonalszym nabożeństwem jest bezsprzecznie to, które najwierniej upodobnia nas do Jezusa, najściślej z Nim jednoczy i poświęca nas wyłącznie Jemu. A ponieważ ze wszystkich ludzi najbardziej podobna do Jezusa jest Najświętsza Maryja Panna, stąd wynika, że spośród wszystkich innych nabożeństw, nabożeństwo do Najświętszej Maryi Panny najbardziej jednoczy z Panem Jezusem duszę naszą i sprawia, że staje się Jemu najbardziej podobna. Im bardziej dusza poświęcona jest Maryi, tym bliższa jest Panu Jezusowi. I dlatego doskonałe poświęcenie się Panu Jezusowi to nic innego, jak doskonałe i całkowite poświęcenie się Najświętszej Dziewicy. I takie właśnie jest nabożeństwo, które głoszę i które w istocie swej stanowi tylko doskonałe odnowienie ślubów i przyrzeczeń złożonych na Chrzcie św.” (TPN n.120).

*Modlitwa:* 
Panie Boże nasz, Ty udzieliłeś św. Ludwikowi łaski prawdziwego nabożeństwa do Najświętszej Maryi i uczyniłeś go nauczycielem poświęcenia się Jezusowi przez Maryję. Przez jego wstawiennictwo udziel nam łaski, abyśmy  byli formowani przez Najświętszą Maryję Pannę i żyli prawdziwym życiem chrześcijanina. Prosimy Cię także o łaskę…(intencja, za którą się modlimy). Przez Chrystusa Pana Naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Nauczyciel prawdziwego nabożeństwa do Najświętszej Maryi Panny i duchowości ofiarowania się Jezusowi przez ręce Maryi', type: 'opis', show: false } 
        ]
      },
      {
        name: `06: ${this.getDatePlusDays(this.startDate, 5)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/06.jpg',type:'foto' },
          { text: `*Dzień szósty: Miłość do Kościoła*
Św. Ludwik, który przygotował się do kapłańskiej, misjonarskiej pracy z ludźmi, żywił głębokie uczucia do Kościoła i rozumiał jego wymiar, który oznacza Naród Boży, Królestwo Boże i misjonarskie posłanie Kościoła. Aby lepiej zrozumieć ducha, który prowadził św. Ludwika, wystarczy przytoczyć dwa teksty z jego życia. Jako młody kapłan, po kilku miesiącach pastoralnego doświadczenia, pisał on swojemu kierownikowi duchowemu: „Z drugiej strony, czuję wielkie pragnienie, aby rozszerzać miłość wobec Pana i Jego świętej Matki, tak, żeby na prosty i ubogi sposób zacząć ewangelizować biednych w wioskach i zachęcać grzeszników do nabożeństwa do Najświętszej Maryi Panny. Tak czynił jeden dobry kapłan, który niedawno umarł w opinii świętości. Podróżował od parafii do parafii, ewangelizując biednych, licząc tylko na Opatrzność Bożą. Naprawdę, mój kochany Ojcze, ja nie jestem godzien tak godnej służby, ale widząc potrzebę Kościoła, nie mogę nie prosić nieustannie o ubogie towarzystwo dobrych kapłanów, którzy by pod obroną Przenajświętszej Dziewicy prowadzili tę misję. Ja z męką chcę uciszyć te dobre i ciągłe pragnienie, całkowicie zapominając o mojej roli, zostawiając wszystko w rękach Bożej Opatrzności i całkowicie poddając się Twoim nakazom, które mi będą zawsze jak przykazanie”. (List 5). Pod koniec swojego życia, św. Ludwik w rozmowie z swoim przyjacielem Blainem tłumaczył swoje misjonarskie życie mądrością, która wszystko czyni dla potrzeb Kościoła: „Jedna jest mądrość w osobach, które żyją we wspólnocie i według reguł, inna jest mądrość misjonarza i apostolskich mężów. Pierwsi nie podejmują nic nowego, ale żyją według reguł ich domów, ale drudzy muszą przynosić chwałę Bogu przez swoją ofiarę i podejmując nowe dzieła. Nie trzeba być zdziwionym, jeżeli się o pierwszych nie mówi, bo oni są spokojni i nie czynią nic szczególnego; ale drudzy trwale walczą naprzeciw świata, ducha ciemności i wad, muszą zaakceptować, że będą od przeciwnika doświadczać wielkie prześladowania. Jeżeli ci pierwsi są zaakceptowani przez świat, to jest to znakiem, że piekło ich się za bardzo nie boi. Tak to jest, kiedy się żyje jak przyjaciel świata. Drudzy to apostolscy mężowie, którzy zawsze podejmują coś nowego. Nie jest możliwe, żeby o nich się nie mówiło. Św. Paweł przeszedł cały grecki i łaciński świat, a św. Piotr poszedł do Rzymu i chciał podłożyć królewskie miejsce Jezusowi Chrystusowi. Działając według tej pierwszej mądrości Synagoga nie reagowałaby i nie prześladowaliby tego małego stada Jezusowego, ale i to małe stado nie rozrosłoby się, a świat i dziś byłby pełen bożków, pogański”. Kiedy św. Ludwik rozważa o Kościele i o jego życiu i posłaniu w świecie, nie jest naiwnym idealistą. Jest głęboko świadomy, że grzech naznacza życie chrześcijan w Kościele. Opis tego stanu świata i Kościoła jest zawarty w dziełach św. Ludwika. „Wspomnij, Panie, na tę Wspólnotę w wymiarze Twojej sprawiedliwości. Dla Pana czas już jest działać: pogwałcili Twoje Prawo. Już czas dokonać tego, co przyobiecałeś! Podeptane jest Twoje święte Prawo i odrzucona Ewangelia. Potoki nieprawości zalewają całą ziemię i porywają ze sobą nawet twoje sługi. Cała ziemia jest spustoszona, niegodziwość wysoko wyniesiona, przybytki Twoje są zbezczeszczone, a ohyda spustoszenia wkradła się nawet do miejsc świętych” (MP n.5). „Twój Kościół tak bardzo osłabiony i zbrukany zbrodniami jego dzieci” (MP n.20). Św. Ludwik szukał narzędzia, jak pomóc ludziom, by wytrwali w nawróceniu. Wszystkim podczas misji polecał odnowienie wiary przed Biblią, odnowienie chrzcielnych przyrzeczeń i poświęcenie się Jezusowi przez Maryję. Pytał: „Skąd pochodzi to ogólne rozprzężenie moralne, jeśli nie stąd, że żyjemy zapominając o obietnicach i zobowiązaniach Chrztu św. i że mało kto osobiście zatwierdza i odnawia przymierze z Bogiem, zawarte przez rodziców chrzestnych” (TPN n.127).

*Modlitwa:* 
Panie Boże nasz, Ty chcesz, aby Twoje Królestwo rozszerzało się na cały świat, dajesz nam swoje Słowo, które przynosi zbawienie. Ty św. Ludwikowi udzieliłeś łaski głoszenia Słowa z odwagą i bez ustanku. Przez jego wstawiennictwo udziel nam łaski, abyśmy to, co od Ciebie przyjęliśmy, mogli dawać innym, by w ten sposób być Twoimi świadkami w świecie. Prosimy Cię także o łaskę…(intencja, za którą się modlimy). Przez Chrystusa Pana Naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Miłość do Kościoła', type: 'opis', show: false }        
        ]
      },
      {
        name: `07: ${this.getDatePlusDays(this.startDate, 6)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/07.jpg',type:'foto' },
{ text: `*Dzień siódmy: Apostoł Krzyża i Chrystusowego zwycięstwa*
Życie duchowe wiąże się nierozerwalnie z duchowym pojmowaniem krzyża, który każdy spotyka w swoim życiu. Posiadanie dojrzałego i zrównoważonego stosunku wobec krzyża jest wielką sztuką duchową. Łatwo jest źle rozumieć i  nie akceptować duchowości krzyża, czego skutkiem może być blokada w rozwoju i dojrzewaniu duchowym. Św. Ludwik jest wielkim nauczycielem duchowości krzyża Chrystusowego i pragnie formować nas, abyśmy naśladowali Chrystusa przez nasze krzyże. Patrząc na krzyż, św. Ludwik patrzył na paschalną tajemnicę Jezusowej męki, śmierci i zmartwychwstania: „Oto, jak sądzę, największa „tajemnica królewska”, największa tajemnica Mądrości Przedwiecznej: to Krzyż. Och! Jakże bardzo myśli i drogi Mądrości Przedwiecznej oddalone są i różne od myśli i dróg ludzkich, nawet najmądrzejszych! Ów wielki Bóg chce odkupić świat, przepędzić i spętać złe duchy; zamknąć piekło i otworzyć ludziom Niebo; Ojcu Przedwiecznemu oddać nieskończoną chwałę. Oto wielki cel, trudne dzieło i ogromne przedsięwzięcie. Czym posłuży się Mądrość, której poznanie obejmuje świat od krańca do krańca, która włada łagodnie i wszystko czyni z mocą? Ma ona wszechmocne ramię; jednym ruchem ręki może zniszczyć wszystko, co jest jej przeciwne, i wszystko uczynić, co zechce; słowem jednym ust swoich może stworzyć i unicestwić wszystko. Wystarczy jej tylko zapragnąć, aby wszystko się stało. Jej Miłość wszelako dyktuje prawa jej mocy. Pragnie ona wcielić się, by dać człowiekowi świadectwo swej przyjaźni; chce sama zstąpić na ziemię, by umożliwić mu wzniesienie się do Nieba. Niech tak się stanie!(..) Ona to właśnie na krzyż spogląda; znajduje w nim upodobanie; ceni go pośród wszystkiego, co największe i wspaniałe w Niebie i na ziemi, jako narzędzie jej podbojów i ozdobę jej majestatu, bogactwo i rozkosz jej panowania, przyjaciółkę i oblubienicę jej Serca. O głębokości bogactw, mądrości i wiedzy Bożej. Jakże Jego wybór jest zadziwiający, a Jego zamysły i sądy – wzniosłe i niepojęte! Jak niewysłowiona jest jednakowoż Jego miłość do tego krzyża! (MMP n.167,168). Jezusowa męka i śmierć na krzyżu jest Bożym wyborem i największym dowodem i realizacją zbawczej miłości Syna Bożego, który będąc w pełni wolny, ofiarowuje się dla naszego odkupienia.  Jezusowa męka jest dowodem i realizacją miłości i to ona woła, by ludzie jej odpowiedzieli miłością. Chrześcijańskie życie jest naśladowaniem Jezusa Chrystusa i odpowiedzią na Jego powołanie do miłości, która się wyraża na co dzień w naszych krzyżach. W ten sposób można zrozumieć duchowość krzyża, którą naucza św. Ludwik: „Pośród wszystkich argumentów, które mogą nas skłonić do miłowania Jezusa Chrystusa, Mądrości Wcielonej – moim zdaniem – najmocniejszy stanowią boleści, jakie zechciał On wycierpieć, by dać nam dowód swojej miłości” (MMP n.154).

*Modlitwa:* 
Panie Boże nasz, Ty w swojej wszechmocnej Mądrości zapragnąłeś, aby Twój Syn, Jezus Chrystus zbawił ten świat przez śmierć na Krzyżu i Zmartwychwstanie. Ty Boże, uczyniłeś św. Ludwika gorliwym apostołem Krzyża Chrystusowego, który głosił Go przykładem i słowem. Przez jego wstawiennictwo udziel nam łaski, aby dobrze nieść nasz krzyż, naśladując twojego Syna. Prosimy Cię także o łaskę…(intencja, za którą się modlimy).  Przez Chrystusa Pana Naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Apostoł Krzyża i Chrystusowego zwycięstwa', type: 'opis', show: false } 
        ]
      },
      {
        name: `08: ${this.getDatePlusDays(this.startDate, 7)}`,
        show: false,
        links: [
          { image: 'assets/nowenna/08.jpg',type:'foto' },
{ text: `*Dzień ósmy: Nauczyciel trwania w łasce*
Z pastoralnego doświadczenia, jako misjonarz, Montfort był głęboko przekonany, że wytrwałość jest wielkim problemem dusz ludzkich i dlatego zachęcał, by zaakceptować duchowość poświęcenia się. Problem wytrwania w dobrym jest bardzo istotny w życiu wiary. Jest to rzeczywistość, w której obecne są: Boża łaska, ludzka wolność i kruchość ludzkiej natury, spowodowana przez przeszłość, słabości i rany, przez negatywne działanie świata i szatana, przez pokusy i wyobraźnię. Abyśmy mogli zbierać owoce, musimy trwać w łasce, musimy być wierni łasce Bożej. Ziarno, które padło na ziemię, musi umrzeć, potem powoli i w ukryciu wzrastać, i w swoim czasie przynieść owoce. Maryja, która była zawsze wierna i wytrwała, pomaga duszy, która Jej się oddaje, aby trwała w wierności i w ten sposób przyniosła owoce. Św. Ludwik zachęca: „Do owego nabożeństwa do Najświętszej Dziewicy zachęca nas skutecznie ta okoliczność, iż stanowi ono cudowny środek wytrwania w cnocie i wierności. Skąd bowiem bierze się to, iż większość nawróconych grzeszników nie potrafi wytrwać? Skąd bierze się to, że tak łatwo znów popadamy w grzech? Skądże pochodzi to, że większa część sprawiedliwych, zamiast postępować w cnocie i wzrastać w łasce, częstokroć traci tę odrobinę posiadanych cnót i łask? Jak wykazałem poprzednio, nieszczęście to pochodzi stąd, że człowiek – przecież tak bardzo skażony, słaby i niestały – przecenia siebie samego, opiera się na własnych siłach i sądzi, że sam zdoła zachować skarb łask, cnót i zasług. Przez to nabożeństwo Najświętszej Dziewicy, która jest wierna, powierzamy wszystko, co posiadamy; uznajemy Ją za Powiernicę wszelkich naszych dóbr natury i łaski; zawierzamy Jej wierności; opieramy się na Jej potędze, na Jej miłosierdziu i miłości, ażeby to Ona zachowała i pomnażała nasze cnoty i zasługi – wbrew diabłu, światu i ciału, czyniących wszystko, by je nam odebrać. Człowiek mówi do Maryi jak dziecko do matki, jak wierny sługa do swej pani: strzeż depozytu wiary. Moja dobra Matko i Pani, uznaję, że dotąd za Twoją przyczyną otrzymałem więcej łask od Pana Boga, niż na to zasługiwałem, a smutne doświadczenia, jakie zdobyłem, pouczyły mnie, że skarb łaski noszę w bardzo kruchym naczyniu i że jestem zbyt słaby i nędzny, by go sam zachować. Błagam Cię więc: wszystko, co posiadam weź w depozyt, i zachowaj Swą wiernością i potęgą. Jeśli Ty będziesz się mną opiekować, nie stracę nic; jeśli Ty mnie podtrzymywać będziesz, nie upadnę; jeśli Ty mnie osłaniać będziesz, uchronię się przed nieprzyjaciółmi” (TPN n.173).

*Modlitwa:* 
Panie Boże nasz, Ty nas powołujesz, abyśmy wytrwali na drodze wiary do końca życia. Przez wstawiennictwo Najświętszej Panny Maryi i św. Ludwika udziel nam łaski, aby dobrze żyć, życiem prawdziwie chrześcijańskim i szczęśliwie umrzeć. Prosimy Cię także o łaskę…(intencja, za którą się modlimy).  Przez Chrystusa Pana Naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
, label: 'Nauczyciel trwania w łasce', type: 'opis', show: false } 
        ]
      },
      {
        name: `09: ${this.getDatePlusDays(this.startDate, 8)}`,
        type: 'html',
        links: [
          { image: 'assets/nowenna/09.jpg',type:'foto' },
          { text: `*Dzień dziewiąty: Prowadzi nas do miłości do Jezusa*
Nabożeństwo do Maryi musi nas prowadzić do Jezusa Chrystusa. Jest to głębokie przekonanie św. Ludwika, o którym wiele razy mówił. Na różne sposoby św. Ludwik wyrażał tę centralną prawdę naszej wiary w Jezusa Chrystusa. Istotą każdej duchowości, także i Maryjnej,  jest fakt, że powinna ona  prowadzić do Jezusa. Maryja jest nieodłączone związana z życiem Jezusa Chrystusa, a więc także i z chrześcijanami. Św. Ludwik tak głosił, opierając się na Słowie Bożym: „Jezus Chrystus, nasz Zbawiciel, prawdziwy Bóg i prawdziwy człowiek, musi być ostatecznym celem wszelkiej naszej pobożności, inaczej byłaby ona fałszywa i zwodnicza. Jezus Chrystus to Alfa i Omega (por. Ap 1,8), początek i koniec wszystkiego (por. Ap 21,16). Pracujemy na to, jak mówi Apostoł, by każdego człowieka uczynić doskonałym w Jezusie Chrystusie (por. Ef 4,13), gdyż tylko w Nim mieszka cała pełnia Bóstwa (por. Kol 2,9) i cała pełnia łaski, cnoty i doskonałości. Tylko w Nim otrzymaliśmy pełnię błogosławieństwa duchowego (por. Ef 1,3). Chrystus jest naszym jedynym Mistrzem, który ma nas nauczać; jedynym Panem, od którego zależymy; jedyną Głową, z którą mamy być zjednoczeni; jedynym Wzorem, do którego mamy się upodobnić; naszym jedynym Lekarzem, który ma nas uzdrowić; jedynym Pasterzem, który ma nas żywić; jedyną Drogą, która ma nas prowadzić; jedyną Prawdą, której musimy wierzyć; jedynym Życiem, które ma nas ożywiać; słowem - jest naszym jedynym Wszystkim we wszystkim, które ma nam wystarczyć. Albowiem nie dano ludziom pod niebem żadnego innego Imienia, w którym moglibyśmy być zbawieni (por. Dz 4,12). Bóg nie położył innego fundamentu dla naszego zbawienia, dla naszej doskonałości i naszej chwały, niż Jezusa Chrystusa. Każda budowla, która nie spoczywa na tej Opoce, stoi na lotnym piasku i wcześniej czy później runie. Każdy wierny, który nie trwa w Nim jak latorośl w winnym szczepie, opadnie, uschnie i będzie wart tylko wrzucenia w ogień (por. J 15,6). Gdy jesteśmy w Jezusie Chrystusie, a Jezus Chrystus jest w nas, nie potrzebujemy obawiać się potępienia (por. Rz 8,1). Ani aniołowie w niebie, ani ludzie na ziemi, ani demony w piekle, ani jakiekolwiek inne stworzenie nie może nam szkodzić, bo nie może nas odłączyć od miłości Bożej, która jest w Jezusie Chrystusie (por. Rz 8,39). Przez Niego, z Nim i w Nim możemy wszystko: możemy oddać Bogu Ojcu w jedności Ducha Świętego wszelką cześć i chwałę; stać się doskonałymi; a dla naszego bliźniego – być miłą wonią Chrystusową na żywot wieczny. Jeśli więc ustanawiamy doskonałe nabożeństwo do Najświętszej Dziewicy, to jedynie po to, by nasze nabożeństwo do Jezusa Chrystusa stało się gruntowniejsze i doskonalsze, oraz by podać łatwy i pewny środek do znalezienia Chrystusa. Gdyby nabożeństwo do Najświętszej Dziewicy oddalało nas od Jezusa Chrystusa, to trzeba by je odrzucić jako złudzenie szatańskie. Tymczasem rzecz ma się przeciwnie, jak to już wykazałem i jeszcze wykażę. Nabożeństwo to jest konieczne, ale po to, by Jezusa Chrystusa całkowicie znaleźć, ukochać Go i wiernie Mu służyć” (TPN n.61,62).

*Modlitwa:* 
Panie Boże nasz, Ty nas powołujesz, abyśmy wierzyli w Twojego Syna, Jezusa Chrystusa i abyśmy Go miłowali. Przez wstawiennictwo Najświętszej Maryi Panny i św. Ludwika udziel nam łaski prawdziwej miłość do Jezusa. Prosimy Cię także o łaskę…(intencja, za którą się modlimy).  Przez Chrystusa Pana Naszego. Amen.

_Ojcze nasz, Zdrowaś Maryjo, Chwała Ojcu_ 

Na koniec odmawiamy Litanię do św. Ludwika de Montfort`
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
      // Zachowaj formatowanie WhatsApp
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