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
        show: false,
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

*_Modlitwa do Ducha Świętego_*

_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie._
_Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie._
_Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia Bożej miłości._
_Amen!_

  *Słowo Boże*
  _„Dlatego zginam kolana moje przed Ojcem, od którego bierze nazwę wszelki ród na niebie i na ziemi, aby według bogactwa swej chwały sprawił w was przez Ducha swego, by potężnie wzmocnił się wewnętrzny człowiek. Niech Chrystus zamieszka przez wiarę w waszych sercach; abyście w miłości zakorzenieni i ugruntowani, wraz ze wszystkimi świętymi zdołali ogarnąć duchem, czym jest Szerokość, Długość, Wysokość i Głębokość, i poznać miłość Chrystusa, przewyższającą wszelką wiedzę, abyście zostali napełnieni całą Pełnią Boga. Temu zaś, który mocą działającą w nas może uczynić nieskończenie więcej niż to, o co my prosimy czy rozumiemy, Jemu chwała w Kościele i w Chrystusie Jezusie po wszystkie pokolenia wieku wieków! Amen” (Ef 3,14–21)._

  *Rozważanie*
  Jaki naprawdę jest Bóg? Możemy mieć różne wyobrażenia o Bogu, o tym, kim On jest. Być może różnie nam Go przedstawiano i mamy zdeformowane wyobrażenie o Nim. Czasami wtedy można myśleć, że jest jakimś dziadkiem siedzącym na chmurce, którego nie traktuje się poważnie, a jeśli mówi się o wierze, to bardziej kojarzy się to z przekonaniami starszych ludzi albo z jakąś sferą kultury czy sztuki. Zwykliśmy też myśleć, że Bóg jest wszystkowiedzącym tyranem, przed którym nic się nie ukryje. Trzeba się Go bać i cierpieć, bo On zsyła na nas choroby i trudności. Echo takich przekonań słychać w powiedzeniu: Pan Bóg nierychliwy, ale sprawiedliwy. Może być też, że myślimy o Bogu jako o egzekutorze, który ciągle nas widzi i wzbudza lęk przed karą. Ostatecznie może być także niedostępny, gdzieś daleko, albo być jakąś bliżej niesprecyzowaną, niezainteresowaną mną energią. Zatrzymaj się i pomyśl o tym przez chwilę. Czy nie ma echa tych wykrzywień w twoim sercu?

  To są różne karykatury Boga. Ale chcemy poznać prawdę „i poznacie prawdę, a prawda was wyzwoli” (J 8,32). Apostoł Filip zapytał kiedyś Jezusa: „Panie, pokaż nam Ojca” (J 14,8). Jaki więc jest Ojciec? Oto, Jego obraz w słowie Bożym: 

  „Panie, przenikasz i znasz mnie, Ty wiesz, kiedy siadam i wstaję. Z daleka przenikasz moje zamysły, widzisz moje działanie i mój spoczynek i wszystkie moje drogi są Ci znane. Choć jeszcze nie ma słowa na moim języku,  Ty, Panie, już znasz je w całości. Ty ogarniasz mnie zewsząd i kładziesz na mnie swą rękę.  Przedziwna  jest dla mnie Twa wiedza, zbyt wzniosła, nie mogę jej pojąć. Gdzież odejdę daleko od Twojego ducha? Gdzie ucieknę od Twego oblicza? Gdy wstąpię do nieba, tam jesteś; jesteś przy mnie, gdy się w Szeolu położę. Gdybym wziął skrzydła jutrzenki, zamieszkał na krańcu morza, tam również Twa ręka będzie mnie wiodła i podtrzyma mnie Twoja prawica. Jeśli powiem: «Niech mnie przynajmniej ciemności okryją i noc mnie otoczy jak światło», nawet ciemność nie będzie ciemna dla Ciebie, a noc jak dzień zajaśnieje: <mrok jest dla Ciebie jak światło>. Ty bowiem utworzyłeś moje nerki, Ty utkałeś mnie w łonie mej matki. Dziękuję Ci, że mnie stworzyłeś tak cudownie, godne podziwu są Twoje dzieła. I dobrze znasz moją duszę,  nie tajna Ci moja istota, kiedy w ukryciu powstawałem, utkany w głębi ziemi. Mnie w zalążku widziały Twoje oczy i w Twojej księdze zostały spisane wszystkie dni, które zostały przeznaczone,  chociaż żaden z nich [jeszcze] nie nastał. Jak niezgłębione są dla mnie myśli Twe, Boże, jak wielkie ich mnóstwo! Gdybym je przeliczył, więcej ich niż piasku; gdybym dosięgnął kresu, jeszcze jestem z Tobą. (...) i zobacz, czy nie podążam drogą nieprawości, a prowadź mnie drogą odwieczną!” (Ps 139,1–18, 24).

  Jak bardzo poruszający i jak bardzo odmienny od naszych fałszywych wyobrażeń jest prawdziwy obraz Boga!

  Czasami zadajemy sobie pytanie: czy da się mnie kochać? Wpatrując się w siebie przez pryzmat wad, porażek, ułomności ,mogę nie tylko mieć niewłaściwe wyobrażenie o Bogu, ale też o sobie. Bo czy moje słabości, zranienia i grzechy stanowią całą prawdę o mnie?

  Pewnego razu w kościele ksiądz na kazaniu dla dzieci mówił o Bogu, który jest Stworzycielem. I opowiadał dzieciom: Drogie dzieci, Pan Bóg jest wspaniałym Stworzycielem – stworzył cały wszechświat, galaktyki, planety, słońce, gwiazdy, księżyc, morza, rzeki, góry i pagórki, stworzył też różne zwierzęta, od tych największych wielorybów i słoni, przez tygrysy, lwy, małpy, pieski i kotki, aż do tych malutkich mróweczek i nawet jeszcze takie organizmy, których nie widać gołym okiem, ale tylko pod mikroskopem. Pan Bóg stworzył drzewa, rośliny i kwiaty. Cały ten wspaniały świat, a na końcu Bóg stworzył najpiękniejsze, najwspanialsze, najdoskonalsze stworzenie. Czy ktoś z was drogie dzieci, wie co to za stworzenie? Na to zgłasza się jedna dziewczynka i mówi: To byłam ja!

Bóg kocha wszystkich ludzi, ale też kocha każdego indywidualnie w sposób, w jaki każdy potrzebuje być kochanym. Ta dziewczynka miała wyjątkowe przekonanie o swojej niepowtarzalności. Bóg chce ci je dać tak, żebyś był pewien, że gdybyś był jedynym mieszkańcem całego wszechświata, to Bóg nie mógłby cię kochać bardziej niż teraz, bo kocha cię najbardziej. Rozumiesz? Spróbuj zatrzymać się w czytaniu w tym momencie i pomyśl o tym przez chwilę. Wiesz, co to znaczy? Bóg mówi: „Ukochałem Cię odwieczną miłością” (Jr 31,3). „Ale teraz tak mówi Pan, Stworzyciel twój, Jakubie, i Twórca twój, o Izraelu: «Nie lękaj się, bo cię wykupiłem, wezwałem cię po imieniu; tyś mój!” (Iz 43,1).

*Bóg ukochał ciebie jako pierwszy.* Jego miłość jest odwieczna. Zanim stworzył wszystko, już myślał o tobie i kochał cię. Jesteś chciany przez Boga. Niezależnie od okoliczności, w których przyszedłeś na ten świat, niezależnie od tego, co słyszałeś od innych i co ci się wydawało: Bóg Ciebie chciał od wieków, już wtedy pragnął ciebie i pokochał. Jesteś kochany i chciany przez Boga! Bóg pierwszy nas ukochał i nadal nas kocha jako pierwszy. On przejął inicjatywę w miłowaniu nas. Wszystko to, co robimy, jest tylko odpowiedzią na Bożą miłość. To ona nas wyprzedza we wszystkim i otacza ze wszystkich stron. Dobry Bóg ukochał nas, zanim jeszcze się narodziliśmy, dlatego nas stworzył, mimo iż w swej Wszechwiedzy wiedział o tym, że będziemy Go obrażać. Jedynym powodem, dla którego Bóg stwarza, jest Jego miłość i dobroć. Prawdziwa Miłość nigdy nie stawia warunków, aby mogła zaistnieć.

*Bóg ukochał ciebie jako grzesznika.* Pan nie daje nam tego, na co zasługujemy, ale daje nam to, czego najbardziej potrzebujemy! On nie kocha nas jako świętych, nieskazitelnych i moralnie czystych. Nie ma potrzeby udawania, że jesteś kimś innym, niż jesteś w rzeczywistości. Nie kocha nas takimi, jakimi chcielibyśmy być, ale takimi, jakimi jesteśmy naprawdę! On nie brzydzi się nikim, kocha każdego. A im większy grzesznik, tym bardziej potrzebuje Jego miłości!

*Bóg ukochał cię bezinteresownie* – nie istnieje żaden warunek do spełnienia, aby Bóg cię kochał. On nawet nie stawia ci żadnych warunków by cię kochać. Nie mówi: gdy będziesz więcej się modlił, gdy będziesz lepszym człowiekiem, gdy nie będziesz kłamał, gdy nie będziesz się kłócił z innymi – wtedy będę cię kochał. Nie mówi: będę cię kochał, ale stawiam warunek: nie będziesz grzeszyć. Nie! Bóg kocha cię dokładnie takim, jakim jesteś w tym momencie. Pomimo twoich grzechów, wad, błędów – On wcale ich nie neguje – tak, one są, ale Jego miłość jest większa!

*Bóg nigdy nie przestanie Cię kochać!* Jest wszechmogący, ale nie może jednej rzeczy: nie może przestać cię kochać!„Bo góry mogą się poruszyć i pagórki się zachwiać, ale miłość moja nigdy nie odstąpi od ciebie!” (Iz 54,10). Kocha cię nie dlatego, że jesteś dobry, ale dlatego, że On jest dobry!

*Bóg kocha Cię czule!* W Biblii (Księga Ozeasza) Bóg mówi o swojej ciągłej opiece. Odwołuje się do obrazów dzieciństwa: noszenie na rękach, nauczanie, opieka. Tak jak to robi tata czy mama. Z wielką czułością. Bóg chce przytulić cię do swojego serca, żebyś w Nim znalazł ukojenie.

Gdy przypatrujemy się Bożej miłości w taki sposób, to przychodzi jedna myśl – to jest raj! Dokładnie! Do życia w takiej miłości zostaliśmy stworzeni przez Boga. Jedyną rzeczą o który cię dzisiaj prosi Bóg, jest to, żebyś uwierzył w Jego miłość do ciebie, byś zaufał Jego słowom o tobie bardziej niż swoim słowom o sobie. Powiedz Mu, że chcesz doświadczyć Jego miłości. To nie my musimy starać się by „doskoczyć” do Boga, ale raczej chodzi o to, by przyjąć Jego miłość, On się uniża, schodzi do ciebie, by cię kochać.

*Lektura duchowa*
_„Piękno owo przedwieczne i wyjątkowo łaskawe, tak bardzo pragnie przyjaźni z ludźmi, iż przygotowało specjalną księgę, by tę przyjaźń zdobyć,_ _odsłaniając przed ludźmi to, jak jest wspaniałe oraz czego pragnie. Księga owa jest niczym list ukochanej do ukochanego, wysłany, by zdobyć jego uczucie._ _Pragnienia serca człowieka, o jakich zaświadcza, są tak naglące, podejmowane poszukiwania człowieczej przyjaźni - tak czułe;_ _wezwania i życzenia są tak pełne miłości, że słysząc, jak [Mądrość] o tym mówi, rzeklibyście, iż to nie Władczyni Nieba i ziemi,_ _lecz że potrzebuje ona człowieka, aby być szczęśliwą._

_By znaleźć człowieka, czasem przebiega szerokie drogi; czasem wspina się na szczyt najwyższych gór;_ _niekiedy przychodzi do bram miast; znów kiedy indziej wstępuje nawet na place publiczne,_ _pośród zgromadzeń wołając najgłośniej, jak może: O viri, ad vos clamito, et vox mea ad filios hominum:_ _O, ludzie! O, synowie człowieczy! do was wołam od tak dawna; do was zwracam mój głos;_ _was pragnę; was szukam; o was się upominam. Słuchajcie, przyjdźcie do mnie; ja was uczynię szczęśliwymi. _I aby pociągnąć ich z mocą, mówi im: „Przeze mnie i z mojej łaski królowie królują,_ _książęta panują, a władcy i monarchowie dzierżą berła i korony._ _To ja w ustanawiających prawo tchnę umiejętność kreślenia praw dobrych, by wprowadzać porządek w państwach,_ _i daję siłę urzędnikom sądowym, by wymierzali sprawiedliwość uczciwie i bez lęku. _Ja miłuję tych, którzy mnie miłują; a którzy rano wstają do mnie, znajdą mnie;_ _a znajdując zaś mnie, znajdzie obfitość wszelkich dóbr._ _Gdyż bogactwa i sława, zaszczyty, godności, pyszne namiętności i prawdziwe cnoty są przy mnie;_ _i bowiem lepiej jest dla człowieka jest mnie posiadać, aniżeli całe złoto i srebro świata,_ _drogie kamienie i dobra całej ziemi. _Tych, co do mnie przychodzą, wiodę drogami sprawiedliwości i roztropności_ _oraz ubogacam ich posiadaniem bogactw, aż do pełni (por. Prz 8, 15–21)._ _I bądźcie pewni, że moją najdroższą rozkoszą jest rozmawiać i przebywać z synami człowieczymi. _Teraz tedy, synowie, słuchajcie mnie: błogosławieni, którzy strzegą dróg moich!_ _Słuchajcie napomnienia i bądźcie mądrymi, a nie odrzucajcie go._ _Błogosławiony człowiek, który mnie słucha i który czuwa u drzwi moich na każdy dzień,_ _i pilnuje u podwojów drzwi moich. _Kto mnie znajdzie, znajdzie żywot i wyczerpie zbawienie od Pana;_ _ale kto przeciw mnie zgrzeszy, zrani duszę swoją._ _Wszyscy, którzy mnie nienawidzą, kochają się w śmierci (Prz 8,32–36). Wyrzekłszy wszystko, co najbardziej czułe i najbardziej ujmujące, by zdobyć przyjaźń ludzi, [Mądrość] jeszcze się obawia, że ze względu jej cudowny blask i najwyższy majestatu, ludziom ją szanującym – brak odwagi by się do niej zbliżyć. Dlatego każe im powiedzieć, że: nie broni do siebie przystępu; że łatwo spostrzegą ją ci, którzy ją miłują, że uprzedza tych, którzy jej pożądają, że ukazuje się im pierwsza i że kto do niej rano wstanie, aby jej szukać, nie będzie się trudził, aby ją znaleźć; bo znajdzie ją siedzącą u drzwi swoich (por. Mdr 6,13b–15)”._

św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 65–69

*Zadanie*
Przeżyję dzisiejszy dzień ze świadomością, że jestem kochany przez Boga bezwarunkowo.

*Modlitwa zawierzenia*
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!_`
 
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
  
  *_Modlitwa do Ducha Świętego_*

 _Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie._ _Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie._
  _ Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia Bożej miłości._
  _Amen!_

  *Słowo Boże*
  _„A wąż był bardziej przebiegły niż wszystkie zwierzęta lądowe, które Pan Bóg stworzył. On to rzekł do niewiasty: «Czy rzeczywiście Bóg powiedział: Nie jedzcie owoców ze wszystkich drzew tego ogrodu?» Niewiasta odpowiedziała wężowi: «Owoce z drzew tego ogrodu jeść możemy, tylko o owocach z drzewa, które jest w środku ogrodu, Bóg powiedział: Nie wolno wam jeść z niego, a nawet go dotykać, abyście nie pomarli». Wtedy rzekł wąż do niewiasty: «Na pewno nie umrzecie! Ale wie Bóg, że gdy spożyjecie owoc z tego drzewa, otworzą się wam oczy i tak jak Bóg będziecie znali dobro i zło». Wtedy niewiasta spostrzegła, że drzewo to ma owoce dobre do jedzenia, że jest ono rozkoszą dla oczu i że owoce tego drzewa nadają się do zdobycia wiedzy. Zerwała zatem z niego owoc, skosztowała i dała swemu mężowi, który był z nią, a on zjadł. A wtedy otworzyły się im obojgu oczy i poznali, że są nadzy; spletli więc gałązki figowe i zrobili sobie przepaski” (Rdz. 3,1–6)._

  *Rozważanie*
 Prawda o Bożej miłości nie jest dla nas oczywista. Wielu mówi: życie to nie bajka, i rzeczywiście tak jest. Czasami rodzi się nawet krzyk z serca: Boże, gdzie Ty jesteś?! Dlaczego na to wszystko pozwalasz?! Można więc zapytać: dlaczego nie doświadczam Bożej miłości na co dzień? Dlaczego to nie jest takie oczywiste? Skąd się biorą te wszystkie wykrzywione wyobrażenia na temat Boga? Skoro tak bardzo pragniemy miłości, to dlaczego jej nie wybieramy? Przecież to nielogiczne. Właśnie.

 Doświadczamy w życiu różnego rodzaju zła. To właśnie doświadczenie zła przeszkadza nam w byciu szczęśliwymi. Najczęściej zło jest skutkiem działania konkretnych ludzi. Czasami jest zło niezawinione przez nas – ludzie rodzą się w kraju, gdzie jest wojna, w rodzinach z problemami alkoholowymi, doświadczamy chorób, śmierci. To rodzi cierpienie, którego nie potrafimy przezwyciężyć. Jest także w naszym życiu takie zło, które jest zawinione przez nas. Z jednej strony wiemy, że grzeszymy, ale widzimy, że często także grzechów nie planujemy. To nie jest tak, że się budzimy rano i myślimy sobie, że o 10.38 na kogoś nakrzyczymy. To często dzieje się nagle. Właśnie dlaczego? Toczy się jakaś walka. Nie rozumiem bowiem tego, co czynię, bo nie czynię tego, co chcę, ale to, czego nienawidzę – to właśnie czynię (Rz 7,15) – przecież chcę dobra, ale mi nie wychodzi. To jest nasz dramat. Jest ścisły związek pomiędzy złem a grzechem. Nie jest nam łatwo przyznać się do grzechu, bo “lecz ludzie bardziej umiłowali ciemność aniżeli światło (...) bo złe były ich uczynki”( J 3,19b). Jednak nie ma nikogo, kto mógłby czuć się wolnym od odpowiedzialności za zło, które czyni. Problem grzechu dotyczy każdego człowieka. To grzech nie pozwala nam doświadczać Bożej miłości, radości i szczęścia w codzienności.

 Księga Rodzaju obrazuje tę prawdę w opowieści o kuszeniu, gdy szatan rozpoczyna je od oczywistego kłamstwa, które ma na celu zasianie wątpliwości w sercach ludzi, a gdy człowiek temu ulega, wtedy daje się pociągnąć w wizję stania się Bogiem i decydowania o tym co dobre, a co złe. Tu chodzi nie tylko o nieposłuszeństwo wobec Boga, ale o odrzucenie Jego miłości i porządku, który On ustanowił. „Dlatego też, jak przez jednego człowieka grzech wszedł do świata, a przez grzech śmierć” (Rz 5,12). Każdy nasz grzech jest w ostateczności niczym innym, jak powieleniem pierwszego grzechu, którego opis znajdujemy w pierwszej księdze Biblii.

 Osobowym źródłem grzechu jest szatan. To od niego pochodzi trucizna. On jest sprawcą zła i tym, który nas zwodzi i oszukuje. „diabeł, jak lew ryczący krąży szukając kogo pożreć” (1P 5,8). Był kiedyś jednym z aniołów, którzy byli najbliżej Boga, ale przez swoją pychę sprzeciwił się Mu i zaczął z Nim walczyć. Zły wie, że Boga nie pokona, bo jest tylko stworzeniem, ale toczy z nami walkę – nienawidzi nas, bo przypominamy mu o wszystkim, co on stracił, a patrząc na nas, widzi w nas podobieństwo do Boga. Dlatego oszukuje nas i zwodzi, aby nas oddzielić od Boga nie tylko w tym życiu, ale na całą wieczność.

 Grzech ma swoje konsekwencje. W relacji do Boga pojawia się dystans. Pismo Święte mówi, że nasze grzechy wykopują przepaść między nami a Bogiem, dlatego Bóg wydaje się daleki, wręcz nieobecny. To trucizna grzechu w taki sposób nas infekuje. Zostaje zerwana więź, jedność i zaczynamy być jak gałązka odcięta od krzewu, która nie przynosi owocu. „Podobnie jak latorośl nie może przynosić owocu sama z siebie – jeśli nie trwa w winnym krzewie – tak samo i wy, jeżeli we Mnie trwać nie będziecie” (J 15,4b).

 Wobec Boga pojawiają się dwa rodzaje agresji: czynna – wyrażana przez bunt, oraz bierna – wyrażana przez obojętność, bierny sprzeciw wobec Boga, lub życie w taki sposób jakby Bóg nie istniał. To prowadzi do oddzielenia od Boga. Bo wynika z kłamliwego przekonania, że przecież Bóg chce mnie ograniczyć i nie pragnie mojego szczęścia – to syk węża z raju, który zakłamuje rzeczywistość i podpowiada nam karykaturalne wyobrażenia o Bogu. Z tymi wyobrażeniami chcieliśmy się rozprawić pierwszego dnia naszych rozważań. Przepaść, która jest między Bogiem a ludźmi na ziemi nazywa się grzechem, a w wieczności jest to piekło. Tak jak teraźniejszość prowadzi do wieczności, tak oddzielenie od Boga przez grzech w teraźniejszości, prowadzi do oddzielenia od Boga w wieczności – do piekła. Bo „Albowiem zapłatą za grzech jest śmierć” (R 6,23) – ostatecznie to jest śmierć wieczna.

 Grzech ma także swoje skutki. Wpływają one na moją teraźniejszość i wieczność. Pomimo wielu różnych ludzkich wysiłków, nie da się zasypać tej przepaści.

Kolejną konsekwencją grzechu jest zaburzenie spojrzenia na siebie i na drugiego człowieka. Pojawia się podejrzliwość, oskarżenia, nieufność, więc muszę się bronić. A jeśli muszę się bronić, to okazuje się, że drugi człowiek jest moim wrogiem – wtedy zaczynam z nim walczyć. Zaczynam ranić, przestaję wierzyć w miłość, zamykam się na czułość, staję się zimny. Zakładam wtedy maskę, udaję kogoś, kim nie jestem. Jest w nas mnóstwo lęku, nie chcemy, żeby ktokolwiek odkrył prawdę o nas, o naszych słabościach, wadach, grzechach, trudnej historii. Lęk zaczyna nas wtedy tresować i podpowiada: jeśli nie spełnisz ich oczekiwań odrzucą cię!

Grzech zatruwa także twoje spojrzenie na siebie samego. Księga Rodzaju obrazuje ten nasz wewnętrzny stan w taki sposób, że gdy pierwsi rodzice popełnili grzech, powstało w nich pewne pęknięcie. Z jednej strony nadal byli stworzeni na obraz i podobieństwo Boże, a z drugiej strony pojawiła się w nich przedziwna skłonność do zła. Odtąd jest w nas pewien wewnętrzny rozdźwięk, jakby rozdwojenie. Zło i bylejakość jakoś łatwiej się pojawiają. Dobro wymaga wysiłku, samozaparcia, dyscypliny. Z jednej strony pragniesz być kochany, ale kiedy doświadczasz zła, które przynosi cierpienie i rani, wtedy właśnie rodzi się w nas pytanie: czy ktoś może mnie pokochać? Zaczynasz patrzeć na siebie przez pryzmat swoich porażek, słabości, wad, źle podjętych decyzji. Tutaj pole do popisu ma twój wewnętrzny oskarżyciel, który wzbudza w tobie poczucie winy i, przypominając to wszystko, wbija cię coraz bardziej w ziemię. Czujesz się przygnieciony. Nie umiesz sobie z tym poradzić. Potrzebujesz jakiejś odskoczni. Zaczynasz pocieszać się grzechem. Choć na chwilę szukasz czegoś co jest przyjemne. Wpadasz w pułapkę, bo grzech cię oszukuje. Płacisz za chwilę przyjemności jeszcze większym upadkiem w spirali oskarżeń.

W końcu patrzysz na swoje życie i na świat i przestajesz widzieć sens tego wszystkiego. Świat wydaje się obcy, problemy życiowe cię przerastają, bo jesteś sam i wszystko ci podpowiada, że sobie z tym nie poradzisz. Widzisz brutalność świata i nie masz na to recepty. Rodzi się lęk przed przyszłością. Nie wiesz, czy podołasz zadaniom, które przyniesie życie. Analizujesz, próbujesz kontrolować i niepokoisz się za każdym razem, kiedy coś się wydarzy, co jest nie po twojej myśli. Widzisz, że nie jesteś w stanie zapanować nad rzeczywistością.

Bóg kocha grzesznika, ale nienawidzi grzechu. Bóg i grzech, to przeciwności. Święty Bóg nie toleruje grzechu. Potrzebujemy uznać, że zło jest silniejsze od nas i zdać sobie sprawę z tego, że potrzebujemy pomocy, ponieważ zło się do nas „przykleja”. Sami nie damy rady, zarówno w relacji z Bogiem, innymi, sobą samymi i światem.

*Lektura duchowa*
_„Wszystko w człowieku było jaśniejące, bez ciemności, piękne bez brzydoty, czyste bez brudu,_ _uładzone bez nieporządku i bez żadnej skazy czy niedoskonałości._ _Miał człowiek w swym umyśle przywilej światła Mądrości, przez które poznawał doskonale i swojego Stwórcę, i stworzenia._ _Miał łaskę Bożą w duszy, dzięki której był niewinny i miły w oczach Najwyższego. Miał w ciele nieśmiertelność._ _Miał w sercu czystą miłość Boga, nielękającą się śmierci; miłował więc Boga, bez ustanku, w sposób czysty, dla samej tylko Jego miłości. _Był człowiek tak Boży, że nieustannie pozostawał poza sobą, w Bogu,_ _nie mając żadnej namiętności do przezwyciężenia ani też żadnego do pokonania nieprzyjaciela._ _O, hojności względem ludzi Przedwiecznej Mądrości! O, szczęśliwy stanie człowieka w jego niewinności!_ _Lecz oto nieszczęście nad nieszczęściami! Oto owo boskie naczynie kruszy się na tysiąc kawałków;_ _oto spada owa piękna gwiazda; oto piękne słońce pokrywa się błotem;_ _oto człowiek, który grzeszy, i grzesząc traci swą mądrość, niewinność, piękno, nieśmiertelność. _I wreszcie, traci wszelkie dobra, jakie otrzymał, i zostaje poddany atakom nieskończonego zła._ _Jego umysł jest tępy i ciemny: już nic nie widzi. Ma serce całkowicie obojętne wobec Boga: już Go nie kocha._ _Ma duszę zupełnie poczerniałą od grzechów: przypomina ona złego ducha._ _Ma wszelkie nieuporządkowane namiętności: nie jest już ich panem._ _Do towarzystwa ma tylko złe duchy, stał się ich mieszkaniem i niewolnikiem. Atakują go stworzenia: wypowiedziały mu wojnę. _Tak w jednej chwili człowiek stał się niewolnikiem złych duchów, przedmiotem gniewu Boga (Por. Ef 2,3) i ofiarą piekieł!_ _Sam sobie wydaje się tak ohydny, że kryje się ze wstydu._ _Jest przeklęty i skazany na śmierć; zostaje wygnany z ziemskiego raju i nie ma już go w Niebie._ _Bez żadnej nadziei, że będzie szczęśliwy, musi wieść nieszczęśliwe życie na przeklętej ziemi. _Musi tu umrzeć jak zbrodniarz, a po śmierci upodobnić się do diabła,_ _na zawsze potępiony na ciele i duszy, on i wszystkie jego dzieci._ _Oto straszne nieszczęście, w jakie popada człowiek, grzesząc; taki jest sprawiedliwy wyrok, jaki wydała na niego Boża sprawiedliwość._ _Adam w tym stanie jest jakby pogrążony w rozpaczy; nie może otrzymać pomocy ani od aniołów, ani od innych stworzeń. Nic nie jest w stanie go naprawić, ponieważ był zbyt piękny i nadto dobrze ukształtowany w akcie stworzenia, a przez swój grzech stał się zbyt ohydny i zbrukany. Widzi się wypędzonym z raju i sprzed oblicza Boga. Widzi Bożą sprawiedliwość, która ściga go i całe jego potomstwo; widzi Niebo zamknięte i otwarte piekło. Nie masz nikogo, kto mógłby mu to pierwsze otworzyć, a to drugie zamknąć”._

św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 38–40

*Zadanie*
Spróbuję dziś dostrzec i uznać moją bezradność wobec zła i grzechu.

*Modlitwa zawierzenia*
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!_`
 
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
  
  *_Modlitwa do Ducha Świętego_*

  _Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie. Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie._
  _ Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia Bożej miłości._
  _Amen!_

  *Słowo Boże*
  _„Tak bowiem Bóg umiłował świat, że Syna swego Jednorodzonego dał, aby każdy, kto w Niego wierzy, nie zginął, ale miał życie wieczne. Albowiem Bóg nie posłał swego Syna na świat po to, aby świat potępił, ale po to, by świat został przez Niego zbawiony” (J 3,16–17)._

  *Rozważanie*
 Stając wobec zła i grzechu, uświadamiając sobie ich realność, rozpaczliwie podejmujemy różne próby poradzenia sobie po ludzku i szukania zabezpieczenia przed tym, co nas przerasta.

Niektórzy szukają jakiegoś rodzaju zabezpieczenia w dobrach materialnych i rzeczywiście mogą one do pewnego stopnia dać złudne poczucie bezpieczeństwa, bo rozwiązują część problemów, jednak w obliczu choroby czy śmierci okazują się bez wartości.

Możemy także poszukiwać schronienia w poczuciu bezpieczeństwa, które płynie z relacji z drugim człowiekiem. Gdy zaczynamy opierać nasze życie i uzależniać nasze szczęście od kogoś, to w momencie, gdy ta osoba nas zrani, zawiedzie, odejdzie lub umrze, okaże się, że taka postawa życiowa jest tkwieniem w iluzji, która jeszcze boleśniej rani.

Również rozwój nauki i techniki zdaje się niektórych tak uwodzić, że jedynego ratunku szukają w osiągnięciach człowieka. Niewątpliwie są to dziedziny, które w naszych czasach bardzo szybko i ekspansywnie się rozwijają, jednak te postępy nie eliminują zła i nie są w stanie zapewnić szczęścia, bo rozwiązując jedne problemy, stwarzają nowe.

Można też próbować po ludzku zaprowadzić pokój i ład na świecie. Pomimo nieustannych deklaracji o pokoju, ciągle wybuchają nowe konflikty, a osoby, które najgłośniej krzyczą o tolerancji, sami nie tolerują tych, którzy inaczej myślą.

Człowiek, mając różne pragnienia duchowe, próbuje znaleźć ukojenie i równowagę wewnętrzną w różnych energiach, amuletach i „przedmiotach na szczęście”, różnych filozofiach i medytacjach wschodnich, jednak często okazuje się, że są one iluzją i pozornym dobrem, za którym ostatecznie kryje się zły duch, by nas zwieść.

Dla tradycyjnych katolików może być też subtelniejsza pokusa – gorliwe podejmowanie różnych praktyk religijnych, postnych, żeby ich mocą wyrwać się z sideł grzechu i zła. Kolejne niepowodzenia wprowadzają człowieka coraz bardziej w oskarżenia i wyrzuty sumienia, bo nie jest on sam w stanie wynagrodzić Bogu i wyrwać się z tej spirali zła. Najlepsze dobre postanowienia, uczynki czy też wyjątkowe przeżycia religijne nie są w stanie nas zbawić.

Ponad tymi wszystkimi naszymi staraniami i wysiłkami jest światło Dobrej Nowiny! Nasza nadzieja jest w Bogu. Bóg nie jest obojętny na sytuację, w której się znaleźliśmy. To On sam wychodzi pierwszy w kierunku człowieka – dał nam swojego Syna. Ponieważ „zapłatą za grzech jest śmierć” (Rz 6,23), ktoś musiał umrzeć – On umarł zamiast ciebie, abyś nie musiał umrzeć na wieki. To tak, jakbyś miał do spłacenia kredyt, który byłby tak wielki, że wobec twoich możliwości finansowych byłbyś bezradny i bez żadnych szans na spłacenie go. Pomimo różnych prób, pożyczek od różnych ludzi i tak sprawa byłaby skazana na porażkę, bo życia nie starczyłoby, aby to wszystko spłacić. I nagle pojawia się ktoś, kto mówi, że bierze wszystkie twoje długi na siebie i nie chce nic w zamian. Czy to możliwe? A może to jakiś podstęp? Nikt o zdrowych zmysłach by tak nie zrobił!

Bóg w swoim odwiecznym zamyśle miłości przygotował drogę odkupienia człowieka, która jest jeszcze bardziej niesamowita niż samo dzieło stworzenia. „Wiemy też, że (Bóg) z tymi, którzy Go miłują współdziała we wszystkim dla ich dobra” (Rz 8,28)– nawet z sytuacji grzechu Bóg wyciągnął jeszcze większe dobro. Kiedy po zwiedzeniu ludzi w ogrodzie rajskim szatan został ukarany, Bóg wypowiedział niezwykłą obietnicę, że zwycięstwo przyjdzie przez Niewiastę i Jej potomstwo. Bóg w swoim zamyśle pełnym mądrości stworzył Niepokalaną Maryję, aby przez Nią mógł przyjść do nas Syn Boży. Gdy przyszedł do Niej archanioł Gabriel, powiedział Jej, że jest pełna łaski. Maryja zmieszała się, bo wiedziała, że pełen łaski jest tylko Bóg. Doskonale pamiętała słowa modlitwy Mojżesza: „Jahwe, Jahwe, Bóg miłosierny i łagodny, nieskory do gniewu, bogaty w łaskę i wierność” (Wj 34,6). Oznaczałoby to coś zdumiewającego. Spójrzmy, jaka jest moc oddania. Najpierw Bóg dał człowiekowi miłość i oddał człowiekowi ziemię i swoją władzę nad światem. Gdy człowiek przez grzech oddał to wszystko w ręce diabła i stał się jego niewolnikiem, Bóg przychodzi do Maryi i daje Jej jeszcze więcej – samego siebie. To jest coś jeszcze wspanialszego niż dzieło stworzenia, bo Bóg nie tylko daje swojemu stworzeniu różne dobra, ale daje samego siebie. Bóg sam oddaje się człowiekowi – oddał się Maryi. Gdy Ona powiedziała Bogu swoje „tak”, Bóg wcielił się, to znaczy, przyjął naszą ludzką naturę. Pomyśl przez chwilę o tym, co to znaczy. Nie chodzi wyłącznie o to, że dwa tysiące lat temu Syn Boży stał się człowiekiem, ale dzięki zgodzie Maryi złączył się on ze wszystkimi ludźmi wszystkich czasów – także z tobą. Co to znaczy, że się złączył? Wziął na siebie twoje życie, ze wszystkimi jego przejawami – radościami, smutkami, myślami, niepokojami, emocjami, relacjami, z całą fizycznością i przeżył je w wierności Ojcu w twoim imieniu. Tam, gdzie my mówimy Bogu Ojcu „nie”, On powiedział „tak”. Ta zgoda była tak radykalna, że zszedł na samo dno upodlenia ludzkiego. Cierpiał odrzucenie, od maleńkości widziano w nim bluźniercę, niesłusznie oskarżano go o najróżniejsze o rzeczy, których nie popełnił, wziął na siebie wszystkie nasze grzechy i to co nas niszczy na krzyż. Chrystus zwyciężył zło, biorąc je całkowicie na siebie. Cierpiał i wytrwał do końca. Na krzyżu umarł zamiast nas. „Lecz On był przebity za nasze grzechy” (Iz 53,5). Spełniło się proroctwo z Księgi Izajasza, gdy Bóg mówił: „Ja, właśnie Ja przekreślam twe przestępstwa i nie wspominam twych grzechów” (Iz 43,25). To wszystko, co nas zabija i niszczy, umarło razem z nim. Szatan, grzech i śmierć zostali pokonani na krzyżu. „Wiecie, że On objawił się po to, aby zgładzić grzechy (...) aby zniszczyć dzieła diabła” (1J 3,5–8). Łeb szatana został zmiażdżony. Na krzyżu Chrystus ukazał moc oddania, mówiąc: „Wtedy Jezus zawołał donośny głosem Ojcze, w Twoje ręce powierzam ducha mojego” (Łk 24,46). Krzyż stał się mostem nad przepaścią, która oddziela nas od Boga. Dzięki śmierci Jezusa i Jego Krwi przelanej za nas nie jesteśmy już wygnańcami z raju, ale jesteśmy usynowieni. Ale nie tylko to. On po trzech dniach zmartwychwstał. Ukazywał się swoim uczniom, aby wzbudzić w nich wiarę, gdy zwątpili. Zbierał ich na nowo w Kościół, by przezwyciężyć to, co ich podzieliło. A gdy znów się zjednoczyli, Chrystus wstąpił do nieba, aby otworzyć drogę do domu Ojca. Odtąd nie jesteśmy wygnańcami. Uczniowie, których zostawił pod opieką Maryi, gdy modlili się razem z Nią, doświadczyli spełnienia się obietnicy Chrystusa i otrzymali moc z wysoka – Ducha Świętego, który ich przemienił. Otrzymali nowe życie. Byli już wolni od lęku, zagubienia, smutku i rozpaczy. Przestali się bać i zaczęli chodzić po całym świecie, mówiąc wszystkim o tym, że Chrystus zmartwychwstał i żyje. Gdy mówili o tym, nic nie było w stanie ich zatrzymać – nawet groźby, chłosty, cierpienia i śmierć. Bóg działał potężne znaki, a oni na własne oczy widzieli, jaka miłość i moc płynie z życia z Bogiem.


*Lektura duchowa*
_„Mądrość Przedwieczna widząc, iż we wszechświecie nie ma nic, co byłoby zdolne zmazać grzech człowieka, uczynić zadość sprawiedliwości i uśmierzyć gniew Boga, a chcąc jednak uratować biednego człowieka, w którym miała upodobanie, znajduje sposób niezwykły. Ta łaskawa i najwyższa Księżniczka – zdumiewająca, niepojęta miłość przekraczająca wszelką miarę – składa samą siebie w ofierze Ojcu, by zadośćuczynić Jego sprawiedliwości, by ułagodzić Jego gniew, by wyrwać nas z niewoli złego ducha i z ogni piekielnych i wysłużyć nam szczęście wieczne. Jej ofiara zostaje przyjęta; rzecz postanowiona i rozstrzygnięta: Mądrość Przedwieczna inaczej Syn Boży stanie się człowiekiem we właściwym czasie i w określonych okolicznościach”._

św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 45-46

*Zadanie*
Przeżyję dzisiejszy dzień w świadomości tego, że potrzebuję pomocy Jezusa i sam nie dam sobie rady.

*Modlitwa zawierzenia*
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!_`
 
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
  
  *_Modlitwa do Ducha Świętego_*

  _Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie. Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie._
  _ Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia Bożej miłości._
  _Amen!_

  *Słowo Boże*
  _„Dlatego, domu Izraela, będę was sądził, każdego według jego postępowania - wyrocznia Pana Boga. Nawróćcie się! Odstąpcie od wszystkich waszych grzechów, aby wam już więcej nie były sposobnością do przewiny. Odrzućcie od siebie wszystkie grzechy, które popełnialiście przeciwko Mnie, i uczyńcie sobie nowe serce i nowego ducha. Dlaczego mielibyście umrzeć, domu Izraela? Ja nie mam żadnego upodobania w śmierci - wyrocznia Pana Boga. Zatem nawróćcie się, a żyć będziecie” (Ez 18,30–32)._

  *Rozważanie*
 Przez pierwsze trzy dni rozważaliśmy, jak nas Bóg ukochał, jak nas niszczy grzech i wpatrywaliśmy się w Jezusa, który jest Zbawicielem pokonującym grzech, śmierć i szatana. Z tej perspektywy widzimy, że zwycięstwo Jezusa jest dla nas wielkim darem, który jest zaproszeniem do odpowiedzi.

Dziś jest czas podjęcia drugiej decyzji. Co z tym zrobisz? Jesteś wolny i możesz podjąć decyzję. Będzie ona miała swoje konsekwencje – w twoim życiu i w wieczności. Zrozumienie tego jest kluczowe.

Po co mam coś zmieniać? Walka, która się rozgrywa, jest wewnątrz nas. Gdy zaczniemy czytać Księgę Rodzaju pod kątem historii grzechu, wtedy dostrzeżemy, jakie przestrzenie infekuje w nas szatan – Adam i Ewa zostają nakłonieni do nieposłuszeństwa, Kain do zazdrości, budowniczy wieży Babel do pokusy samowystarczalności i niezależności od Boga, ludzie w czasach Noego są kuszeni do bierności, by nic nie robić, nie podejmować żadnej decyzji. Przecież „takie czasy”, „taki jest dzisiaj świat”, „wszyscy tak robią”, „inaczej się nie da”, „mam jeszcze czas”.

Dzisiejsza decyzja to przejście od religijności do wiary. Co to oznacza? Religijność to taki sposób przeżywania swojej relacji z Bogiem, gdzie wypisuję listę rzeczy, o które chcę poprosić Boga, aby mi w nich pobłogosławił. To postawa, w której Bóg jest mi potrzebny do spełnienia moich zamiarów, pragnień, czasami nawet takich, które wydają się bardzo pobożne. Wiara, to relacja, w której daję Bogu czystą kartkę, podpisuję ją swoim imieniem i mówię: wypełnij ją jak chcesz, a ja Ci ufam, że mnie przez to wszystko przeprowadzisz. Można powiedzieć, że religijność to martwa wiara. Jak ona wygląda? Jednym z przejawów jest bycie tzw. katolikiem tradycyjnym – przyjąłem wiarę od rodziców, ale nie była ona moim osobistym wyborem. Innym przejawem martwej wiary jest „katolicyzm przepisowy” – najważniejsze jest wtedy przestrzeganie przykazań, zasad i przepisów, często co prawda są one uciążliwe, ale ich zachowywanie jest dla mnie pewnego rodzaju chlubą. Jeszcze innym przejawem martwej wiary jest „dobroludzizm” – przekonanie, że wystarczy być dobrym człowiekiem, czynić dobro, pomagać, angażować się charytatywnie. Przecież nikogo nie zabiłem, nikogo nie okradłem, więc jestem dobrym człowiekiem.

Dzisiejszy dzień to zaproszenie do wyjścia z karykatur wiary i wejścia w ożywiającą relację z Bogiem, który ma moc wskrzesić to, co umarło w naszym życiu, i napełnić nas prawdziwym życiem. Jezus sam mówił o sobie: „Ja jestem drogą, prawdą i życiem” (J 14,6). Żyć naprawdę, oznacza żyć w relacji z Nim. Ta więź nazywa się żywą wiarą.

Jezus, który pokonał śmierć, grzech i szatana, panuje nad wszystkim. Jemu wszystko jest poddane. Także to, nad czym my straciliśmy kontrolę. Jemu nic nie wymyka się spod ręki. On jest Panem świata materialnego i duchowego, On panuje nad złym duchem, chorobami, lękami, niepokojami.

Bóg pokazuje nam dynamikę oddania. Najpierw On, stwarzając świat i człowieka, dał ludziom swoją miłość i obdarował go różnymi dobrami. „A Bóg widział, że wszystko, co uczynił, było bardzo dobre” (Rz 1,31). Później, gdy na jaw wyszła bolesna prawda o tym, że potrafimy zniweczyć nawet największe Boże dary przez nasz grzech, i gdy oddaliśmy się przez nieposłuszeństwo Bogu w niewolę diabła, Bóg dał nam siebie samego przez Maryję, a wszystko, co oddaliśmy w niewolę złego, Chrystus odkupił swoją Krwią. Gdy umierał na krzyżu, dał nam testament – swoją ostatnią wolę: „Oto Matka Twoja” (J 19, 27) – On oddaje nam Maryję, żebyśmy mogli tak jak Jan Apostoł wziąć Ją do siebie, do swojego życia. Ona, która najlepiej Go poznała i spędzała z Nim najwięcej czasu, może nas najlepiej nauczyć prawdziwego życia oddanego Bogu i w Jego bliskości. Bóg zaprasza Cię dzisiaj do podjęcia decyzji, żeby zaprosić Maryję do swojego serca, żeby wziąć ją do siebie i mieć relację z żywym Bogiem przez Maryję.

To jest właśnie łaska wiary, przez którą możesz nawiązać więź z Bogiem żyjącym. Bóg realnie chce się z tobą spotkać i mieć żywą relację. Bóg szuka Cię na drogach twojego życia przez różne sytuacje, wydarzenia. Dostrzegasz to? Słowo Boże mówi: „My miłujemy [Boga], ponieważ Bóg pierwszy nas umiłował” (1 J 4,19), „który umiłował mnie i samego siebie wydał za mnie. Nie mogę odrzucić łaski danej przez Boga” (Ga 2,20–21). Na dar zbawienia nie można sobie zasłużyć czy zapracować. Otrzymaliśmy go za darmo, z Bożej dobroci i hojności. Bóg jest dobry, więc daje mi łaskę wiary. Mogę ją przyjąć lub odrzucić. Jaka jest dziś moja decyzja?


*Lektura duchowa*
_„Mądrość Przedwieczna jest głęboko poruszona nieszczęściem biednego Adama i całego jego potomstwa. Widzi ona, i smuci się wielce, że chwalebne jej naczynie jest rozbite, wizerunek jej rozdarty, arcydzieło zniszczone, jej ziemski – namiestnik – upadły._

św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 41-43

*Zadanie*
Przeżyję dzisiejszy dzień w ufności, że przez wszystko, co się w nim wydarzy, cokolwiek to będzie, Bóg chce mnie przeprowadzić.

*Modlitwa zawierzenia*
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!_`
 
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

*_Modlitwa do Ducha Świętego_*

_Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie._
_Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie._
_Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę odkrycia Bożej miłości._
_Amen!_

  *Słowo Boże*
  _„Błogosławieni ubodzy w duchu, albowiem do nich należy królestwo niebieskie” (Mt 5,3)._

  *Rozważanie*
 Odkąd opuściliśmy raj, powstała w nas pustka, którą może wypełnić tylko Bóg. Niestety, żyjąc wśród tego świata, szukamy wypełnienia tej przestrzeni. Świat przedstawia nam swoją propozycję i oszukuje, że przez zdobywanie dóbr, czy to zewnętrznych czy wewnętrznych (różne nasze przywiązania do naszych pragnień, wyobrażeń, swojego sposobu myślenia), możemy osiągnąć wewnętrzne spełnienie. Duch tego świata okłamuje nas, mówiąc: możesz mieć w życiu wszystko. Masz w centrum swojego istnienia postawić swe potrzeby i ciągle się realizować, zdobywając nowe rzeczy. To pokusa diabła, który staje przed Jezusem i mówi: „Dam Ci wszystko, jeśli upadniesz i oddasz mi pokłon” (Mt 4,9). Na tym właśnie polega oszustwo i kłamstwo, o którym mówi świat: szczęśliwy jest ten, kto jest bogaty, kto ma pieniądze, kto posiada wiele dóbr. Problem powstaje wtedy, gdy coś nie wyjdzie.

W pierwszej kolejności ubóstwo to świadoma zgoda na to, aby nie być niewolnikiem tego, co posiadam. To droga wolności, w której mogę zadowolić się tym, co konieczne i rezygnować z rzeczy niepotrzebnych. I nie niepokoić się tym, jeśli coś stracę, co i tak nie jest mi niezbędne. To zrezygnowanie z konsumpcyjnego stylu życia, w którym ciągle coś kupuję. Jednak ubóstwo to coś więcej.

Ubóstwo nie oznacza braku pieniędzy. To pewna postawa wewnętrzna, w której chodzi o to, żeby wobec przeżywanych braków oprzeć się na Bogu, by żyć świadomością, że wszystko mam u Boga. Jemu zależy na tym, żeby nasze zubożenie stało się bogactwem! To jeden z paradoksów, jakich w Ewangelii jest wiele. Ubóstwo jest lekarstwem, które otrzymuję od Boga, aby wyleczył mnie z choroby opierania się na samym sobie. Ubóstwo leczy mnie z kłamliwego przekonania, że nikt mi nie pomoże i muszę liczyć tylko na siebie.

Bez świadomości tego, że jesteśmy w rękach kochającego Boga, o czym rozważaliśmy w pierwszym dniu, nie moglibyśmy przełknąć tego gorzkiego lekarstwa. Dlatego św. Paweł powie: „Przechowujemy zaś ten skarb ten skarb w naczyniach glinianych, aby z Boga była owa przeogromna moc, a nie z nas” (2 Kor 4,7). Nosimy w sobie skarb Bożej Miłości, chociaż jesteśmy kruchymi, glinianymi naczyniami, bardzo ubogimi. To właśnie sytuacje niepowodzeń, cierpień i trudności pokazują mi, kim tak naprawdę jestem. Bolesne sytuacje, które przeżywam, odsłaniają przede mną prawdę o mnie samym.

Łatwo jest kochać Boga i ufać, gdy wszystko idzie po mojej myśli i nie ma większych problemów. Jednak wtedy można wpaść w iluzję, która, opadając w momencie kryzysu, boleśnie odkrywa moje prawdziwe oblicze. I nie jest problemem to, że takie sytuacje się zdarzają. One były, są i będą.

Papierkiem lakmusowym życia w ubóstwie jest nieustanny wewnętrzny stan uwielbienia. Dusza im bardziej uboga, tym bardziej żyje w uwielbieniu. I odwrotnie – im dusza bardziej liczy na siebie, tym bardziej pyta: ale za co uwielbiać Boga?

Jeśli zdarzy się jakaś trudność, to od kogo oczekuję pomocy? Czy mam w sobie spontaniczny poryw do tego, by stawać „pomimo” mojego ubóstwa przed Bogiem, wiedząc, że przecież jestem w Jego rękach? Trudne sytuacje prowokują do zadania sobie pytania: czy w moim życiu jestem zdany na Boga we wszystkim, czy raczej na siebie? Czy nadal zachowuję w świadomości ufność w Bożą miłość, wierząc, że Bóg przez to przeprowadzi, bo przecież jest Bogiem, czy raczej nerwowo szukam rozwiązań po swojemu, żeby się czegoś uchwycić? Albo odwrotnie: jak reaguję w sukcesach i powodzeniach? Czy przypisuję wszystko Bogu i Jemu oddaję chwałę, czy sobie?

*Ubóstwo Maryi – Magnificat* – „Wtedy rzekła Maryja: «Wielbi dusza moja Pana i raduje się duch mój w Bogu, moim Zbawcy»” (Łk 1,46). Postawa Maryi wskazuje, że ubóstwo daje radość i wprowadza człowieka w postawę uwielbienia. To postawa, w której człowiek nie uzależnia siebie od tego, co może mieć, a związuje się jedynie z Bogiem. Z tego płynie cała moc przyciągania duszy do Boga

*Walka, przeciwstawienia się złu – na czym polega?* Na tym, by być wpatrzonym w Boga, a nie w dobra materialne czy też we własne porażki. Moja wartość nie zależy od tego, co posiadam ani od sukcesów odniesionych w życiu. Jeśli ktoś mnie pochwali, nadal mam taką samą wartość w oczach Boga. Jeśli ktoś mnie skrytykuje, nadal mam taką samą wartość w oczach Boga. Jeśli odniosę porażkę, nadal mam taką samą wartość w oczach Boga. Na tym etapie pojawia się pokusa zniechęcenia, na którą trzeba uważać. Można ją przezwyciężyć postawą ubóstwa. Moja prawdziwa wartość jest w Bogu. Duch tego świata mówi: musisz sam sobie radzić. A wiara mówi: czyń, co możesz, ale ponad wszystko ufaj Bogu.

*Lektura duchowa*
_„Aby mieć mądrość:_

_1. Trzeba, po pierwsze, albo rzeczywiście porzucić dobra tego świata, jak uczynili to Apostołowie, uczniowie, pierwsi chrześcijanie czy zakonnicy: najlepiej zrobić to jak najwcześniej – to najpewniejszy sposób, by posiąść Mądrość; albo przynajmniej trzeba oderwać swe serce od dóbr i posiadać je tak, jakby ich wcale się nie posiadało (por, 1 Kor 7,30), nie zabiegać o to, by je mieć; nie troszczyć się o ich zachowanie; nie skarżyć się ani nie denerwować, gdy się je traci – co bardzo trudne jest do wykonania. 2. Nie można wzorować się na zewnętrznych modach ludzi światowych: w ubiorze czy w umeblowaniu, czy w tym, co dotyczy domów, posiłków oraz innych zwyczajów i zajęć w życiu: Nolite conformari huic saeculo (Rz 12,2). Jest to konieczniejsze niż się zazwyczaj sądzi”._

św. Ludwik Maria Grignion de Montfort, Miłość Mądrości Przedwiecznej, 197-198

*Zadanie*
Poproszę Maryję, aby uczyła mnie żyć w zależności tylko i wyłącznie od Boga.

*Modlitwa zawierzenia*
_Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!_`
 
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