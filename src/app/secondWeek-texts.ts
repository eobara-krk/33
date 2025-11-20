export class SecondWeekTexts {
static modlitwaDoDuchaSw: string = `<b>Modlitwa do Ducha Świętego</b><br><i>Duchu Święty, natchnij mnie. Miłości Boga, pochłoń mnie. Po prawdziwej drodze prowadź mnie, Maryjo, moja Matko, spójrz na mnie, z Jezusem błogosław mnie. Od wszelkiego zła, od wszelkiego złudzenia, od wszelkiego niebezpieczeństwa zachowaj mnie.</i><br>`;
static modlitwaZawierzenia: string = `<b>Modlitwa zawierzenia</b><br><i>Jestem cały Twój i wszystko, co mam, jest Twoją własnością, umiłowany Jezu, przez Maryję, Twoją świętą Matkę. Amen!</i>`;
static tytul: string = '<br><i><b>Tydzień drugi - Poznanie Maryi</b></i><br>';
 
static dayTitles: { [key: number]: string } = {
  1: 'Dzień 1: Maryja Nowa Ewa',
  2: 'Dzień 2: Dziewictwo i macierzyństwo Maryi',
  3: 'Dzień 3: Niepokalane Poczęcie',
  4: 'Dzień 4: Wniebowzięcie Najświętszej Maryi Panny',
  5: 'Dzień 5: Maryja Niewiasta Eucharystii',
  6: 'Dzień 6: Niepokalane Serce Maryi - naszym schronieniem',
  7: 'Dzień 7: Apostołowie Tryumfu Niepokalanego Serca Maryi'
};

static getDayText(nr: number, body: string = '', withZawierzenie: boolean = false): string {
  const label = SecondWeekTexts.dayTitles[nr] || `Dzień ${nr}`;
  let result = `${SecondWeekTexts.tytul}<b>${label}</b><br><br>${SecondWeekTexts.modlitwaDoDuchaSw}<br>${body}`;
  if (withZawierzenie) {
    result += `<br>${SecondWeekTexts.modlitwaZawierzenia}`;
  }
  return result;
}


static trescDzien1: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie jako nowej Ewy, początku nowego świata.</i><br><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„Wtedy Pan Bóg rzekł do węża: «Ponieważ to uczyniłeś, bądź przeklęty wśród wszystkich zwierząt domowych i dzikich; na brzuchu będziesz się czołgał i proch będziesz jadł po wszystkie dni twego istnienia. Wprowadzam nieprzyjaźń między ciebie a niewiastę, pomiędzy potomstwo twoje a potomstwo jej: ono ugodzi cię w głowę, a ty ugodzisz je w piętę" </i>(Rdz 3,14-15).<br>
<b>Rozważanie</b>
„Gdy pierwszy człowiek w raju dopuścił się zwątpienia w Bożą miłość, mądrość i dobroć, gdy nie zawierzył Bogu i popełnił grzech, przestępując Jego przykazanie, nastąpiła ciemność, rozpacz i beznadziejność. Wtedy Bóg litując się nad człowiekiem, który jest dziełem Jego nieskończonej miłości, ukazał mu Nadzieję: Niewiastę i Owoc Jej żywota. (...) Odtąd ludzkość czekać będzie na zapowiedzianą Niewiastę i w Niej skupi wszystkie swoje nadzieje..." (Wyszyński, 1984).<br>
Misja Maryi jako Matki Bożej odczytywana jest w Kościele już od II wieku w kluczu „nowej Ewy". „Węzeł nieposłuszeństwa Ewy został rozwiązany przez posłuszeństwo Maryi" (<i>Przeciw herezjom</i>, 1981).<br>
W życiu każdego z nas odnajdujemy historię pierwszego stworzenia, której patronką jest Ewa. To historia naszego nieposłuszeństwa Bogu: grzechy dzieciństwa, bunt młodości, zaniedbania relacji z Bogiem, odejście od przykazań, modlitwy, sakramentów... Czasami konsekwencje takiego życia sprawiają efekt spalonej ziemi, które trafnie oddają słowa: „I tak wszystko to, czego się tknę/ W proch i pył obraca się/ Nie wiem sam, gdzie miejsce dla mnie jest" (Perfect, <i>Wyspa, drzewo, zamek</i>, 1982). Czas przyjrzeć się wszystkim obszarom życia fizycznego, psychicznego i duchowego, i zobaczyć, czy, gdzie i na ile mogło zostać zrujnowane przez grzech. Czy relacje z Bogiem i ludźmi żyjącymi wokół mnie nie pokryły się prochem i pyłem? Zawsze, gdy zamiast uznania własnej winy, szukamy jej u innych, odzywa się w nas syndrom „madame Eva", jak mówił św. Filip Neri. Samousprawiedliwienie - to druga po nieposłuszeństwie choroba człowieka w raju: „Wąż mnie zwiódł i zjadłam" (Rdz 3,13). Tak powstał węzeł, który plącze nasze życie, stawiając siebie, innych ludzi, a nawet rzeczy przed Bogiem i ponad Boga. Od upadku Adama i Ewy przy drzewie „słowo wężowe" plącze miłość z pożądliwością, pracę z pracoholizmem, odpoczynek z lenistwem, oszczędność z chciwością, a czasami także pobożność z faryzejską dewocją.<br>
Jednak doskonały plan Boży przewidział, że „Ewa jako dziewica nienaruszona poczęła słowo wężowe i zrodziła nieposłuszeństwo i śmierć. Wiarę natomiast i radość poczęła Dziewica Maryja" (św. Justyn, 1926). Jak Ewa stała się „przyczyną upadku" tak Maryja stanie się „przyczyną zbawienia" i początkiem „nowego stworzenia", początkiem „nowego ludu", uczennicą „nowego Prawa" opartego na miłości, Niewiastą „nowego serca", w którym Bóg zbuduje „nowe Jeruzalem". „To, co Ewa straciła przez niewierność, Maryja odzyskała przez wiarę i stała się dla pielgrzymującego ludu znakiem pociechy i niezawodnej nadziei" - tak modli się Kościół sprawując Najświętszą Ofiarę (Mszał Rzymski).<br>
Do Maryi - „nowej Ewy" możemy zwracać się więc jako Matki „drugiego stworzenia" przez łaskę i miłosierdzie. Ona otrzymała moc od Boga, aby rozwiązywać węzły naszego poplątanego przez grzechy życia i prosić o dar odnowionego życia. Wielką skutecznością cieszy się Nowenna rozwiązująca węzły, która powstała na podstawie obrazu Matki Bożej z XVIII w., który znajduje się w Augsburgu. Widzimy na nim, jak aniołowie podają Maryi wstążkę z węzłami, a Ona rozwiązuje jeden po drugim. „Tak też węzeł nieposłuszeństwa Ewy został rozwiązany przez posłuszeństwo Maryi" - jak pisał św. Ireneusz. Oddajmy Niepokalanemu Sercu Maryi nasze węzły życia i prośmy Ją, aby pomogła nam zrywać więzy grzechu w szczerze przeżywanej spowiedzi, uczyła nas unikać grzechów i przyjmować Ducha Świętego - Stwórcę „nowego serca".<br>
<b>Modlitwa</b>
<i>Ukochana Matko, Najświętsza Maryjo, Ty, która rozwiązujesz węzły zniewalające Twoje dzieci, wyciągnij ku mnie Twoje miłosierne dłonie. Dziś oddaję Ci ten węzeł ... (wymienić zniewalający grzech lub życiowy problem) i wszelkie zło w moim życiu, którego stał się przyczyną. Daję Ci węzeł, który mnie dręczy, czyni nieszczęśliwym i przeszkadza mi zjednoczyć się z Tobą i Twoim Synem Jezusem, moim Zbawcą.</i><br>
<i>Uciekam się do Ciebie, Maryjo rozwiązująca węzły, albowiem ufam Ci i wiem, że nigdy nie wzgardziłaś grzesznym dzieckiem błagającym Cię o pomoc. Wierzę, że możesz rozwiązać ten węzeł, gdyż Jezus dał Ci taką władzę. Ufam, że zechcesz uwolnić mnie od tego zniewolenia, albowiem jesteś moją Matką. Wiem, że to uczynisz, ponieważ kochasz mnie miłością czerpaną z samego Boga. Dziękuję Ci, Matko ukochana.</i><br>
<i>Maryjo rozwiązująca węzły, módl się za mną.</i><br>
<i><b>Witaj Królowo, Matko Miłosierdzia,</b></i>
<i>życie, słodyczy i nadziejo nasza, witaj!</i>
<i>Do Ciebie wołamy</i>
<i>wygnańcy, synowie Ewy,</i>
<i>do Ciebie wzdychamy, jęcząc i płacząc,</i>
<i>na tym łez padole.</i>
<i>Przeto, Orędowniczko nasza,</i>
<i>one miłosierne oczy Twoje na nas zwróć,</i>
<i>a Jezusa, błogosławiony owoc żywota Twojego,</i>
<i>po tym wygnaniu nam okaż.</i>
<i>O łaskawa, o litościwa, o słodka Panno Maryjo!</i><br>
<b>Lektura Duchowa</b>
<i>„Najświętsza Maryja Panna jest Dziewicą wierną, wiernością naprawiającą szkody spowodowane wiarołomstwem niewiernej Ewy, i wyprasza wszystkim, którzy się do Niej przywiążą, wierność Bogu i wytrwałość. Dlatego pewien święty porównuje Ją z silną kotwicą, co broni człowieka przed rozbiciem na wzburzonym morzu doczesnego życia, gdzie tyle dusz ginie z powodu braku tego silnego oparcia: Przywiązujemy, powiada on, dusze nadzieją do Ciebie jako do silnej kotwicy. Przecież to do Niej najbardziej przywiązywali się święci, którzy ocaleli, i do Niej przywiązywali drugich, by wytrwali w cnocie. Szczęśliwi więc, tysiąckroć szczęśliwi są chrześcijanie, co teraz przywiązują się do Niej jako do silnej kotwicy i wiernie przy Niej trwają. Nie zgubią ich burze tego świata nie zniszczą ich niebieskich skarbów. Szczęśliwi wchodzący do Niej, jak do arki Noego! Wody potopu grzechu, w których tylu zginęło, nie zaszkodzą im, albowiem ci, mówi Maryja z Mądrością (Syr 24, 22), którzy ze Mną nad swym zbawieniem pracują, nie upadną. Szczęśliwe niewierne dzieci nieszczęsnej Ewy, co przywiązują się do Matki i Dziewicy zawsze wiernej i niezawodnej (Aplikacja słów św. Pawła (2Tym 2,13) do Najświętszej Maryi Panny) i zawsze kochającej tych, co Ją kochają (2 Prz 8, 17), i to nie tylko miłością uczuciową, lecz miłością prawdziwą i skuteczną. Chroni Ona swych czcicieli wielką obfitością łask, by nie cofali się w cnocie, nie upadali w drodze i nie utracili łaski Jej Syna"</i>
Św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i>, 45<br>
<b>Zadanie</b>
Zastanowię się, co jest moim zniewoleniem. Codziennie będę prosić Maryję o dar uwolnienia.<br>`;

static trescDzien2: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie jako Matki Boga i Matki mojej.</i><br><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„Dlatego Pan sam da wam znak: Oto PANNA pocznie i porodzi Syna, i nazwie Go imieniem EMMANUEL"</i> (Iz 7,14).<br>
<b>Rozważanie</b>
Dziewicze macierzyństwo to najpiękniejsza tajemnica Maryi. Bóg objawia w swojej Matce pełnię człowieczeństwa i kobiecości, przez którą „zrodziła Króla wieków i zachowując chwałą dziewictwa, doznała radości matki", przez co „żadna z kobiet na ziemi nie dorówna w Jej godności" (NMP Matka Zbawiciela, 1998). Katechizm Kościoła Katolickiego uczy, że „Maryja jest prawdziwie „Matką Bożą", ponieważ jest Matką wiecznego Syna Bożego, który stał się człowiekiem i który sam jest Bogiem" (KKK 509) oraz „Maryja, nazywana w Ewangeliach „Matką Jezusa" (J 2,1; 19,25), już przed narodzeniem swego Syna jest ogłoszona, pod natchnieniem Ducha Świętego, „Matką mojego Pana" (Łk 1,43). Istotnie, Ten, którego poczęła jako człowieka z Ducha Świętego i który prawdziwie stał się Jej Synem według ciała, nie jest nikim innym jak wiecznym Synem Ojca, drugą Osobą Trójcy Świętej. Kościół wyznaje, że Maryja jest rzeczywiście Matką Bożą (<i>Theotokos</i>) (KKK 495). Z tej fundamentalnej prawdy, że Maryja jest Matką Boga-człowieka, co uroczyście ogłosił sobór w Efezie (431) wynikają pozostałe tytuły, jakimi czcimy Maryję: Niepokalana, Wniebowzięta, Królowa. Jednak wielkie plany Boga nie wypełniają się bez udziału wolnej woli Maryi: „Było zaś wolą Ojca miłosierdzia, aby Wcielenie poprzedziła zgoda Tej, która przeznaczona została na matkę" (Sobór Watykański II, KK 56).<br>
Macierzyństwo Maryi, zapoczątkowane przez Jej fiat wypowiedziane w Nazarecie, dopełnia się pod krzyżem, gdzie stanie się Matką nas wszystkich po uroczystej deklaracji Jezusa: „Oto Matka Twoja" (J 19,27). Kościół nam wyjaśnia, że „sens tego wydarzenia jest dostępny tylko dla wiary, która widzi go w powiązaniu tajemnic między sobą, w całości misteriów Chrystusa, od Wcielenia aż do Paschy. Św. Augustyn rolę Maryi wyjaśnia prosto: «Jako że nasz pierwotny upadek nastąpił, gdy kobieta poczęła w sercu truciznę węża, nie jest zaskoczeniem, że nasze zbawienie przyszło, gdy kobieta poczęła w swym łonie ciało Wszechmogącego. Oboje, mężczyzna i kobieta, upadli: oboje musieli zostać przywróceni. Przez kobietę zostaliśmy posłani na zgubę: dzięki kobiecie przywrócono nam zbawienie»" (Kazanie 289).<br>
Dziewicze macierzyństwo Maryi rozciąga się na cały Kościół, który w bólach rodzenia (Ap 12,2) wydaje dla wieczności nowe potomstwo odkupione Krwią Jezusa. Maryja jest Matką Bożą i Matką Kościoła. Jej dziewicze macierzyństwo przywraca na właściwe miejsce również cnotę czystości w sercach wierzących. Pisze o tym św. Jan Henryk kard. Newman: „Moje drogie dzieci, wy, młodzi mężczyźni, i wy, młode kobiety - jak bardzo potrzebujecie wstawiennictwa Dziewicy Matki, Jej pomocy, Jej przykładu w tej dziedzinie! Żyjecie w świecie, cóż zatem poprowadzi was wąską ścieżką, jeżeli nie myśl o Maryi i Jej pomoc? Kto, jeśli nie Maryja opieczętuje wasze zmysły i uspokoi serca, gdy otaczające widoki i dźwięki niosą niebezpieczeństwo? Co, jeśli nie pełna miłości łączność z Maryją da wam cierpliwość i wytrwałość, gdy znuży was długa walka ze złem, gdy zmęczy was i znudzi ciągła konieczność pilnowania się, ciągłe pamiętanie o środkach zapobiegających grzechowi - to napięcie umysłu, ten stan smutku i przygnębienia. Ona pocieszy was w rozczarowaniach, podtrzyma w wysiłkach, podniesie, gdy upadniecie, nagrodzi, gdy się wam powiedzie. Ona ukaże wam swojego Syna, waszego Boga i wasze wszystko. Czy wasza dusza jest pobudzona, czy też odprężona; kiedy odczuwa smutek; gdy traci równowagę; staje się niespokojna i kapryśna; kiedy obrzydnie jej to, co posiada, a pożąda tego, czego nie ma; gdy wasze oczy pociągnie zło, zaś wasza ludzka natura drży w cieniu kusiciela - co przywróci wam pokój i przywiedzie do wyzdrowienia, jeżeli nie ożywcze tchnienie Niepokalanej i woń Róży Szaronu? Religia katolicka z dumą głosi, że posiada dar, dzięki któremu może uczynić młode serce czystym. Jest tak, ponieważ Jezusa Chrystusa daje nam na Pokarm, a Maryję ofiarowuje jako naszą troskliwą Matkę. Niech ta dumna obietnica wypełni się i w was. Udowodnijcie światu, że nie podążacie za żadną fałszywą nauką. Prostotą waszej postawy, świętością waszych słów i uczynków brońcie przed światem chwały waszej Matki Maryi, której ten świat bluźni. Udajcie się do Niej po królewską niewinność serca" (Newman, 1906).<br>
<b>Modlitwa św. Cyryla Aleksandryjskiego († 444)</b>
<i>Pozdrawiam Cię, Maryjo, Matko Boga,</i>
<i>czcigodny Skarbie całego wszechświata,</i>
<i>Światłości, która nie gaśnie,</i>
<i>Ty, z której narodziło się Słońce sprawiedliwości,</i>
<i>Berło prawdy, Świątynio niezniszczalna.</i>
<i>Pozdrawiam Cię, Maryjo,</i>
<i>Mieszkanie Tego, którego żadne miejsce nie ogarnie.</i>
<i>Ty wydałaś Kłos, który nigdy nie przeminie.</i>
<i>Przez Ciebie pasterze oddali Bogu chwałę.</i>
<i>Przez Ciebie jest błogosławiony w Ewangelii Ten, który przychodzi w imię Pana.</i>
<i>Przez Ciebie Trójca Święta jest wielce pochwalona.</i>
<i>Przez Ciebie Krzyż adorowany jest na całym świecie.</i>
<i>Przez Ciebie radują się niebiosa.</i>
<i>Przez Ciebie ludzkość dźwignięta z upadku.</i>
<i>Przez Ciebie świat cały wreszcie poznał prawdę.</i>
<i>Przez Ciebie na całej ziemi zakłada się Kościoły.</i>
<i>Przez Ciebie Jedyny Syn Boży zajaśniał Swoją światłością</i>
<i>nad tymi, którzy byli w ciemnościach i w cieniu śmierci siedzieli.</i>
<i>Przez Ciebie Apostołowie mogli głosić narodom zbawienie.</i>
<i>Przez Ciebie ziemia cała aż skacze z radości!</i>
<i>Jak głosić Twoją chwałę, o Matko Boga!</i><br>
<b>Lektura duchowa</b>
„Trudno to podobnym do nas grzesznikom uzyskać pozwolenie, zdolność i światło, by móc wstąpić do miejsca tak wzniosłego i świętego, którego strzeże już nie cherubin, jak dawnego raju ziemskiego (Zob. Rdz 3, 24), lecz sam Duch Święty, co stał się wszechwładnym Panem tego Miejsca i co mówi o Nim: Ogrodem zamkniętym jesteś, Siostro ma, oblubienico, ogrodem zamkniętym, źródłem zapieczętowanym (6 Pnp 4,12). Maryja jest „zamknięta", jest „zapieczętowana"; nędzne dzieci Adama i Ewy, wypędzone z raju ziemskiego, nie mają wstępu do tego Raju bez szczególnej łaski Ducha Świętego, a na nią muszą zasłużyć. Wysłużywszy zaś sobie przez wierność ową wielką łaskę, należy z upodobaniem trwać we wnętrzu Maryi, wypoczywać w nim w pokoju, opierać się na nim z ufnością, ukrywać się w nim bezpiecznie i całkowicie się w nim zatracać, aby w dziewiczym łonie Maryi dusza:
- karmiła się mlekiem Jej łaski i macierzyńskiego miłosierdzia;
- uwolniona była od niepokojów, obaw i wątpliwości;
- była bezpieczna od wszystkich swych nieprzyjaciół, od szatana, świata i grzechu, co nigdy tu nie mieli dostępu; dlatego sama Maryja zapewnia nas, że ci, którzy w Niej swe uczynki spełniają, nie grzeszą (zob. Syr 24,22), to znaczy, że duchowo mieszkający w Najświętszej Dziewicy nie popełniają grzechu ciężkiego;
- była ukształtowana w Jezusie Chrystusie, a Jezus Chrystus w Niej. Albowiem, według Ojców Kościoła, łono Maryi jest Przybytkiem boskich sakramentów, w którym zostali ukształtowani Jezus Chrystus i wszyscy wybrani".
św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i>, 263-264<br>
<b>Zadanie</b>
Podziękuje Bogu za Maryję. Oddam Jej swoje serce i całe ciało. Z pomocą Maryi strzec będę godności mojego człowieczeństwa.<br>`;

static trescDzien3: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie i zgłębienia daru Niepokalanego Poczęcia.</i><br><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„Wielbi dusza moja Pana i raduje się duch mój w Bogu, moim Zbawcy. Bo wejrzał na uniżenie Służebnicy swojej. Oto bowiem błogosławić mnie będą odtąd wszystkie pokolenia, gdyż wielkie rzeczy uczynił mi Wszechmocny; a święte jest Jego imię"</i> (Łk 1,46-49).<br>
<b>Rozważanie</b>
Przywilej Niepokalanego Poczęcia Maryi wynika z Jej Bożego macierzyństwa i stanowi nowy początek. „Rzeczywistość, której na imię Niepokalane Poczęcie jest takim punktem zwrotnym w dziejach zbawienia. Bóg w swej odwiecznej miłości wybrał człowieka: wybrał go w swoim Synu (...) Ani grzech pierworodny, ani też cała historia win osobistych i grzechów społecznych nie odwiodła Ojca Przedwiecznego od tego miłościwego Planu. Ponieważ zaś to wybranie miało przyoblec się w kształt Wcielenia - ponieważ Syn Boży dla naszego zbawienia miał stać się Człowiekiem, Ojciec Przedwieczny wybrał Mu wśród ludzi Matkę. Wybrał Ją - i od początku: od pierwszej chwili poczęcia - uczynił godną Bożego Macierzyństwa. Uczynił Ją pierwszą dziedziczką świętości własnego Syna. Pierwszą wśród odkupionych Jego krwią, od Niej po ludzku Mu przekazaną. Uczynił Ją: Niepokalanie Poczętą (Niepokalaną w samej chwili poczęcia)" (Jan Paweł II, 1978). Tak miała się wypełnić obietnica z Raju: „Wprowadzam nieprzyjaźń między ciebie i niewiastę, pomiędzy potomstwo twoje a potomstwo jej" (Rdz 3,15). Ciągle uczestniczymy w tej duchowej walce i - jak pocieszająco mówił Jan Paweł II - ani historia naszych osobistych win, ani nawet grzechów społecznych nie jest w stanie zniweczyć Bożego planu zbawienia. W centrum tego planu jest nowy Adam - Chrystus i nowa Ewa - Maryja. Przez posłuszeństwo i zaufanie Bogu ludzkość ma powrócić do Ojca Stworzyciela.<br>
W Polsce wśród wielu wzorów całkowitego zaufania Maryi jest św. Maksymilian Kolbe. To całkowite oddanie Niepokalanej doprowadziło go do niezwykłej aktywności przemieniającej rzeczywistość. Począwszy od zamiany pustego pola w osadę „Niepokalanów", gdzie zamieszkało 600 zakonników, przez realny wpływ na społeczeństwo przez rozpowszechnianie „Rycerza Niepokalanej" w ilości 1 mln egzemplarzy, działalność misyjną w Japonii, aż po realne świadectwo miłości przez męczeńską śmierć w Auschwitz-Birkenau. Właśnie w Niepokalanowie Jan Paweł II zwrócił uwagę, że „jego serce i myśl skupiły się w szczególnej mierze na tym nowym Początku, jakim w dziejach ludzkości stało się - za sprawą Odkupiciela - Niepokalane Poczęcie Matki Jego ziemskiego wcielenia" (Jan Paweł II, 1983). Spotkanie z Niepokalaną - Matką nowego Początku ludzkości, którym jest Jezus Chrystus, dla nas indywidualnie i bardzo osobiście może stać się nowym Początkiem w życiu. Św. Maksymilian pisał: „Jedynie Bóg sam rozumie to doskonale, co znaczy «Niepokalana»... «Niepokalane Poczęcie» pełne jest pocieszających tajemnic" (list z 12 IV 1933 r.). Te pocieszające tajemnice otwierają się dla tych, którzy oddadzą Maryi swoje serce.<br>
<b>Modlitwa św. Maksymiliana Kolbe (†1941)</b>
<i>Kim jesteś o Pani? Kim jesteś o Niepokalana? Nie mogę zgłębić, co to jest być stworzeniem Bożym. Już przechodzi me siły zrozumieć, co znaczy być przybranym dzieckiem Bożym. A Ty, o Niepokalana, kim jesteś? Nie tylko stworzeniem, nie tylko dzieckiem przybranym, ale Matką Bożą i to nie przybraną tylko Matką, ale rzeczywistą, Bożą Matką.</i><br>
<i>I to jest nie tylko przypuszczenie, prawdopodobieństwo, ale pewność, pewność zupełna, dogmat wiary. A czy jeszcze jesteś Bożą Matką? Tytuł matki się nie zmienia. Na wieki Bóg będzie Ci mówił „Matko moja"... Dawca czwartego przykazania czcić Cię będzie na wieki, zawsze... Kim jesteś o Boża? I lubował się On, Bóg wcielony, w nazywaniu Siebie Synem Człowieczym. Lecz ludzie tego nie zrozumieli. I dziś jakże mało dusz i jak niedoskonale jeszcze pojmuje. Dozwól mi chwalić Cię Panno Przenajświętsza.</i><br>
<i>Uwielbiam Cię o Ojcze nasz w niebie za to, żeś w Jej przeczystym łonie Syna swego Jednorodzonego złożył. Uwielbiam Cię o Synu Boży, żeś do Jej przeczystego łona wstąpić raczył i prawdziwym, rzeczywistym Jej Synem się stał. Uwielbiam Cię o Duchu Przenajświętszy, żeś w Jej nieskalanym łonie Ciało Syna Bożego uformować raczył. Uwielbiam Cię o Trójco Przenajświętsza, o Boże w Trójcy Świętej Jedyny, za tak Boskie wyniesienie Niepokalanej. I nie będę ustawał codziennie po przebudzeniu się ze snu najpokorniej z czołem o ziemię uwielbiać Cię Boże Trójco, mówiąc trzykrotnie: „Chwała Ojcu i Synowi, i Duchowi Świętemu. Jak było na początku i teraz, i zawsze, i na wieki wieków. Amen".</i><br>
<i>Dozwól mi chwalić Cię Panno Przenajświętsza. Dozwól, bym własnym kosztem Cię chwalił. Dozwól, bym dla Ciebie i tylko dla Ciebie żył, pracował, cierpiał, wyniszczył się i umarł. Dozwól, bym się przyczynił do jeszcze większego, do jak największego wyniesienia Ciebie. Dozwól, bym Ci przyniósł taką chwałę, jakiej jeszcze nikt Ci nie przyniósł. Dozwól, by inni mnie w gorliwości o wywyższenie Ciebie prześcigali, a ja ich tak, by w szlachetnym współzawodnictwie chwała Twoja wzrastała coraz głębiej, coraz szybciej, coraz potężniej, tak, jak tego pragnie Ten, który Cię tak niewysłowienie ponad wszystkie istoty wyniósł. W Tobie Jednej bez porównania bardziej uwielbiony stał się Bóg, niż we wszystkich Świętych Swoich. Dla Ciebie stworzył Bóg świat. Dla Ciebie i mnie też Bóg do bytu powołał. Skądże mi to szczęście? O dozwól mi chwalić Cię, o Panno Przenajświętsza.</i><br>
<b>Lektura duchowa</b>
<i>„Nie ma i nigdy nie będzie stworzenia, w którym Bóg jaśniałby wspanialej aniżeli w Najświętszej Maryi Dziewicy, nie wyłączając ani błogosławionych, ani cherubinów, ani nawet najwznioślejszych serafinów Nieba. Maryja jest rajem «Boga», Jego niewysłowionym światem, do którego zstąpił Syn Boży, ażeby działać w nim cuda, strzec go i mieć w nim swe upodobanie. Bóg stworzył świat dla człowieka, który pielgrzymuje, właśnie ten nasz świat, i stworzył świat dla człowieka błogosławionego - jest światem Niebo. Ale Bóg uczynił też inny jeszcze świat, świat dla Siebie, i dał mu imię Maryja: Świat niemal nieznany śmiertelnikom na ziemi, niepojęty dla aniołów i świętych w Niebie, którzy wielbiąc Boga tak wzniosłego i wyższego nad wszystko stworzenie, a ukrytego w swoim „świecie" - w Matce Bożej, Maryi, dniem i nocą wołają: Święty, Święty, Święty (Iz 6, 3)".</i>
św. Ludwik Maria Grignion de Montfort, <i>Tajemnica Maryi</i>, 22<br>
<b>Zadanie</b>
Podziękuję Bogu za dar Niepokalanej Matki Chrystusa i mojej. W trudnych sytuacjach powtarzać będę Jej imię: Maryjo, Maryjo, Maryjo.<br>`;

static trescDzien4: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie i zrozumienia przywileju Twojego Wniebowzięcia.</i><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„Potem świątynia Boga w niebie się otwarła i Arka Jego Przymierza ukazała się w Jego świątyni. (...) Potem wielki znak ukazał się na niebie: Niewiasta obleczona w słońce i księżyc pod jej stopami, a na jej głowie wieniec z gwiazd dwunastu"</i> (Ap 11,19a;12,1).<br>
<b>Rozważanie</b>
„U kresu swego życia ziemskiego Niepokalana Matka Boga, Maryja zawsze Dziewica, została wzięta z ciałem i duszą do niebieskiej chwały" (Pius XII, 1950). Jak? Gdzie? Kiedy? Tego nie wiemy. Dogmat Kościoła o Wniebowzięciu Maryi ukazuje w Niej całą moc i cel Odkupienia w Chrystusie. Niepokalana - czyli wolna od grzechu, Matka i Dziewica - ukazuje pierwotny zamiar Boga, kim i jaki miał być człowiek: czysty i piękny oraz płodny w harmonii miłości. Ten plan został naruszony przez grzech, ale nie zniweczony. Wcielenie Jezusa, przez które Maryja Dziewica stała się Matką Bożą, przywróciło nam utraconą godność i wskazało cel naszego wiecznego przeznaczenia: zmartwychwstanie ciała. Wniebowzięcie Maryi z ciałem i duszą wskazuje nam, że wszystko w Niej było pełne harmonii i piękna, bez żadnych niespójności. Czysta wiara, która prowadziła Maryję w posłuszeństwie do pełnego wypełniania woli Bożej. W każdej chwili życia. Potrzebujemy przywrócenia takiej równowagi i spójności w życiu: między wolą a działaniem, myślami a słowami, duszą a ciałem.<br>
W Wenecji znajduje się imponujący obraz Tycjana z 1518 r. przedstawiający scenę Wniebowzięcia. Matka Boża wznosi się na chmurze ku niebu w otoczeniu aniołów. Na dole pozostają apostołowie, zaskoczeni tym w czym uczestniczą, już tęsknią za Matką. Wokół Maryi rozbłyskuje poświata nieba, a Jej wzrok skierowany jest ku górze, gdzie spotyka się ze spojrzeniem Boga Ojca, który z otwartymi ramionami przyjmuje Swoją umiłowaną Córkę, Matkę swego Syna i Oblubienicę Ducha Świętego. Obok Wszechmocnego już czeka Michał Archanioł z koroną chwały. To, co łączy dwie sfery tego obrazu: ziemską i niebiańską, to intensywna czerwień szat apostołów, Maryi i Boga Ojca. Kolor krwi Zbawiciela i ognia miłości Ducha Świętego. Apostołowie, którzy reprezentują cały Kościół, zaczynają rozumieć, że misja Maryi się nie skończyła. Bóg, zabierając Maryję do nieba, nie zabiera Jej z ich serc. Więcej, Maryja - modlące się serce Kościoła przyzywa Ducha Świętego, aby zstępował, oczyszczał i odnawiał. We Wniebowzięciu Maryi stworzenie osiąga cel wyznaczony przez Stwórcę. Teraz my - dzieci, musimy dać się poprowadzić naszej Matce.<br>
Na czym polega sens naszego oddania Maryi? Na naśladowaniu Jej życia, czyli sposobu, w jaki Ona przeszła swoją ziemską drogę do niebiańskiej chwały. Od zwiastowania, kiedy wypowiada swoje: „Oto ja" - przed Bogiem i daje się prowadzić Duchowi Świętemu. On nie tylko kształtuje w Niej Chrystusa, ale także prowadzi Ją przez wydarzenia i spotkania. Najpierw „wybrała się i poszła z pośpiechem w góry" (Łk 1,39), by odwiedzić Elżbietę, ponieważ przyjęcie Chrystusa zawsze oznacza: wyruszyć w drogę. Tak już będzie wyglądało życie Maryi - droga do Betlejem, ucieczka do Egiptu, codzienne drogi Nazaretu, podążanie za Jezusem podczas Jego nauczania, droga za Synem na Golgotę, przyjęcie odpowiedzialności Matki, rodzącego się pod krzyżem i w Wieczerniku Kościoła. Maryja zachowuje i rozważa w sercu wydarzenia własnego życia i dostrzega w nich coraz wyraźniej tajemniczy plan Boga Ojca dla zbawienia całego świata. Całe życie Maryi jest wznoszeniem się, aż ostatecznie we Wniebowzięciu rozbrzmiewa Jej Magnificat. Na wzór naszej Matki, oddając się Bogu do dyspozycji na wszystkich drogach naszego życia, i razem z Maryją Wniebowziętą wołajmy:<br>
<i>Wielbi dusza moja Pana</i>
<i>i raduje się duch mój w Bogu, Zbawicielu moim.</i>
<i>Bo wejrzał na uniżenie swojej Służebnicy.</i>
<i>Oto bowiem odtąd błogosławić mnie będą wszystkie pokolenia,</i>
<i>Gdyż wielkie rzeczy uczynił mi Wszechmocny,</i>
<i>a Jego imię jest święte.</i>
<i>Jego miłosierdzie z pokolenia na pokolenie</i>
<i>nad tymi, którzy się Go boją.</i>
<i>Okazał moc swego ramienia,</i>
<i>rozproszył pyszniących się zamysłami serc swoich.</i>
<i>Strącił władców z tronu,</i>
<i>a wywyższył pokornych.</i>
<i>Głodnych nasycił dobrami,</i>
<i>a bogatych z niczym odprawił.</i>
<i>Ujął się za swoim sługą, Izraelem,</i>
<i>pomny na swe miłosierdzie,</i>
<i>Jak obiecał naszym ojcom,</i>
<i>Abrahamowi i jego potomstwu na wieki.</i>
<i>Chwała Ojcu i Synowi,</i>
<i>i Duchowi Świętemu.</i>
<i>Jak była na początku, teraz i zawsze,</i>
<i>i na wieki wieków. Amen.</i><br>
<i>Przyjdź Duchu Święty, przyjdź przez potężne wstawiennictwo Niepokalanego Serca Maryi, Twojej umiłowanej Oblubienicy.</i><br>
<b>Lektura duchowa</b>
<i>„Bóg wysłuchał zanoszonych do Niego próśb, o życie ukryte, ubogie i pełne upokorzeń, i w dobroci swojej zasłonił przed wzrokiem ludzkim Jej Poczęcie i Narodzenie, tajemnice Jej życia, Jej Wniebowzięcie. Nawet rodzice nie znali Jej dobrze: aniołowie zaś często pytali siebie nawzajem: Kim jest Ta? (Pnp 3, 6; 8, 5) Albowiem i przed nimi Ją ukrył Najwyższy ukrył; a jeśli czasem odsłaniał im rąbek tajemnic, to jeszcze większe wspaniałości przed nimi ukrywał."</i>
Św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i>, 3<br>
<i>„Aby dziękować Bogu za łaski, którymi obdarzył Najświętszą Dziewicę, dzieci Maryi wzorem świętych, będą odmawiać często Magnificat. Jest to jedyna modlitwa, jedyne dzieło, które Najświętsza Dziewica ułożyła, lub raczej, które w Niej ułożył Jezus, gdyż On mówił przez Jej usta. To najwspanialsza pieśń uwielbienia, jaką Bóg otrzymał w przymierzu łaski. Hymn to z jednej strony, najpokorniejszy i najbardziej pełny wdzięczności, z drugiej strony - najbardziej szczytny i najwznioślejszy. Zawiera on tajemnice tak wielkie i tak ukryte, że nawet aniołowie wszystkich nie znają. Gerson, pobożny i uczony pisarz, który życie całe poświęcił nauce, dopiero u schyłku życia, i to z drżeniem, podjął się napisania objaśnienia do Magnificat, pragnąc tym dziełem ukoronować wszystkie swe prace. W potężnym tomie opowiada on o wielu cudownościach tej pięknej i Bożej pieśni. Między innymi, pisze, że Najświętsza Dziewica często odmawiała Magnificat, zwłaszcza po Komunii św., jako dziękczynienie. Uczony Benzoniusz, który również napisał komentarz do Magnificat, opowiada o wielu cudach zdziałanych mocą tego hymnu. Autor mówi, że szatani drżą i uciekają, gdy słyszą słowa hymnu: On przejawia moc ramienia swego, rozprasza pyszniących się zamysłami serc swoich</i> (Łk 1, 51)".
Św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i>, 255<br>
<b>Zadanie</b>
Uświadomię sobie, że moje życie nie kończy się na ziemi. W niebie czeka na mnie miłujący Bóg i Maryja w pełni swojego przebóstwionego człowieczeństwa.<br>`;

static trescDzien5: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie jako Matki Bożego Ciała i dar głębokiego przeżywania Eucharystii.</i><br><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„Jam jest chleb życia. Ojcowie wasi jedli mannę na pustyni i pomarli. To jest chleb, który z nieba zstępuje: Kto go je, nie umrze. Ja jestem chlebem żywym, który zstąpił z nieba. Jeśli kto spożywa ten chleb, będzie żył na wieki. Chlebem, który Ja dam, jest moje ciało [wydane] za życie świata». Sprzeczali się więc między sobą Żydzi, mówiąc: «Jak On może nam dać [swoje] ciało do jedzenia?» Rzekł do nich Jezus: «Zaprawdę, zaprawdę, powiadam wam: Jeżeli nie będziecie jedli Ciała Syna Człowieczego ani pili Krwi Jego, nie będziecie mieli życia w sobie. Kto spożywa moje Ciało i pije moją Krew, ma życie wieczne, a Ja go wskrzeszę w dniu ostatecznym. Ciało moje jest prawdziwym pokarmem, a Krew moja jest prawdziwym napojem. Kto spożywa moje Ciało i Krew moją pije, trwa we Mnie, a Ja w nim. Jak Mnie posłał żyjący Ojciec, a Ja żyję przez Ojca, tak i ten, kto Mnie spożywa, będzie żył przeze Mnie. To jest chleb, który z nieba zstąpił - nie jest on taki jak ten, który jedli wasi przodkowie, a poumierali. Kto spożywa ten chleb, będzie żył na wieki». To powiedział ucząc w synagodze w Kafarnaum"</i> (J 6,48-59).<br>
<b>Rozważanie</b>
Boże macierzyństwo Maryi pod krzyżem prowadzi do Jej macierzyństwa powszechnego. Testament Jezusa z krzyża poszerza Serce Maryi - Matki aż po krańce świata. Serce Matki jest jak otwarty dom, który czeka na powrót dziecka, nawet jeśli odeszło z tego domu już dawno. Matka to ochrona dla Prawdy, którą jest Jej Syn. Matką jest też Kościół, który w Sercu swej Matki - Maryi rozumie, co znaczy być Matką. Św. Jan Paweł II pisze, że „Kościół też uczy się od Maryi swego własnego macierzyństwa. «Rozważając Jej tajemniczą świętość i naśladując Jej miłość oraz spełniając wiernie wolę Ojca», Kościół rozpoznaje ów macierzyński wymiar swojego powołania, który związany jest istotowo z jego sakramentalną naturą" (<i>Redemptoris Mater</i>, nr 43). Maryja prowadzi nas do sakramentów. Rodzi nas do wiary przez słuchanie Słowa Bożego, a wiara prowadzi do spotkania z Bogiem. Polski Papież powie wprost: „Maryja prowadzi wiernych do Eucharystii" (<i>Redemptoris Mater</i>, nr 44). Podkreśla to Jan Paweł II w swojej ostatniej encyklice o Eucharystii: „Jeśli chcemy ponownie odkryć ścisłą więź, jaka istnieje między Kościołem i Eucharystią, w całym jej bogactwie, nie możemy zapomnieć o Maryi, Matce i Wzorze Kościoła"(<i>Ecclesia de Eucharistia</i>, nr 53).<br>
Maryja stała się „Matką Najświętszego Sakramentu", gdy aktem woli swojego „tak", pozwoliła działać Bogu i Słowo stało się Ciałem w Jej dziewiczym łonie. Zawsze kiedy kapłani Kościoła sprawują Najświętszą Ofiarę - w chwili konsekracji - dzięki mocy Ducha Świętego, przez sakramentalne słowa nad chlebem i winem, Jezus prawdziwie i rzeczywiście staje się obecny. Kapłańskie „tak" w posłuszeństwie Kościołowi, na wzór posłuszeństwa Bogu Maryi, sprawia, że w Eucharystii Jezus staje się obecny ze Swym Bóstwem i ze Swym chwalebnym Ciałem, które otrzymał od Maryi Dziewicy. Jezus narodzony w Betlejem - czyli Domu Chleba, staje się dla nas Chlebem Życia. Dlatego Maryja jest także Matką Eucharystii. Za każdym razem kiedy na Mszy św. słyszymy słowa Chrystusa: „To jest bowiem Ciało Moje, które za was będzie wydane", powinniśmy być świadomi, że to Ciało Chrystusa jest z Jej ciała, że Maryja jest Matką Ciała Eucharystycznego.<br>
Jak mamy przeżywać Mszę św. z Maryją? Po pierwsze Jan Paweł II podpowie nam: tak jakbyśmy z Nią śpiewali Magnificat: „Maryja wspomina wspaniałe dzieła, jakich Bóg dokonał w dziejach zbawienia, zgodnie z obietnicą, jaką złożył ojcom (por. Łk 1, 55), ogłaszając cud, który je wszystkie przewyższy - zbawcze Wcielenie. W Magnificat jest też obecny wymiar eschatologiczny Eucharystii. Za każdym razem, kiedy Syn Boży uobecnia się nam w «ubóstwie» znaków sakramentalnych chleba i wina, zasiewane jest w świecie ziarno nowych dziejów, w których władcy są «strącani z tronów», a «pokorni zostają wywyższeni» (por. Łk 1, 52). Maryja opiewa «nowe niebiosa» i «nową ziemię» (<i>Ecclesia de Eucharistia</i>, nr 58). Po drugie, abyśmy postępowali tak, jak Maryja, która „całym swoim życiem ucieleśniła tajemnicę Eucharystii" (<i>Mane nobiscum, Domine</i>, nr 31). Uczmy się z Maryją przeżywać Mszę świętą z pokorą, która przystoi wobec śmierci Jezusa na krzyżu, z zasłuchaniem w Słowo, które wskazuje drogę w życiu, z uwielbieniem świętej Obecności, z adoracją Najświętszego Ciała w Komunii świętej i odwagą świadczenia o miłości Boga, gdy wracamy do domu po otrzymaniu błogosławieństwa.<br>
<b>Litania do Najświętszego Sakramentu</b>
<i>Kyrie eleison. Christe, eleison. Kyrie eleison.</i>
<i>Chryste, usłysz nas. Chryste, wysłuchaj nas.</i><br>
<i>Ojcze z nieba Boże,<b>zmiłuj się nad nami.</b>
<i>Synu, Odkupicielu świata, Boże,</i>
<i>Duchu Święty, Boże,</i>
<i>Święta Trójco, Jedyny Boże,</i>
<i>Chlebie żywy, któryś zstąpił z nieba,</i>
<i>Boże ukryty i Zbawicielu,</i>
<i>Pszenico wybranych,</i>
<i>Hostio święta,</i>
<i>Hostio żywa,</i>
<i>Hostio Bogu przyjemna,</i>
<i>Pokarmie Aniołów,</i>
<i>Manno ukryta,</i>
<i>Ofiaro czysta,</i>
<i>Ofiaro nieustająca,</i>
<i>Baranku bez skazy,</i>
<i>Ołtarzu najczystszy,</i>
<i>Pokarmie i uczto,</i>
<i>Kielichu błogosławieństwa,</i>
<i>Kapłanie i Ofiaro,</i>
<i>Tajemnico wiary,</i>
<i>Sakramencie pobożności,</i>
<i>Więzi miłości,</i>
<i>Pamiątko cudów Bożych,</i>
<i>Chlebie nadprzyrodzony,</i>
<i>Bezkrwawa Ofiaro,</i>
<i>Najświętsze i najwznioślejsze misterium,</i>
<i>Boskie lekarstwo nieśmiertelności,</i>
<i>Najpotężniejszy fundamencie łask,</i>
<i>Wzniosły i czcigodny Sakramencie,</i>
<i>Ofiaro najświętsza ze wszystkich,</i>
<i>Słowo, które stało się ciałem i zamieszkało między nami,</i>
<i>Niebiańskie lekarstwo, chroniące nas przed grzechami,</i>
<i>Najświętsza pamiątko Męki Pańskiej,</i>
<i>Cudzie zadziwiający ponad wszystko,</i>
<i>Darze przekraczający wszelką pełnię,</i>
<i>Szczególna pamiątko Bożej miłości,</i>
<i>Nieskończona skarbnico Bożych bogactw,</i>
<i>Budzący bojaźń i ożywiający Sakramencie,</i>
<i>Umocnienie dusz świętych,</i>
<i>Najsłodsza uczto, w której posługują Aniołowie,</i>
<i>Prawdziwa Ofiaro przebłagalna za żywych i umarłych,</i>
<i>Pokarmie na drogę dla umierających w Panu,</i>
<i>Zadatku przyszłej chwały,</i><br>
<i>Bądź nam miłościw,<b>wybaw nas, Panie</b>,</i>
<i>Od niegodnego przyjmowania Ciała i Krwi Twojej,</i>
<i>Od pożądliwości ciała,</i>
<i>Od pożądliwości oczu,</i>
<i>Od pychy tego świata,</i>
<i>Od wszelkiej okazji do grzechu,</i>
<i>Przez Twoje pragnienie spożywania Paschy z uczniami,</i>
<i>Przez największą pokorę, z jaką obmyłeś uczniom nogi,</i>
<i>Przez najgorętszą miłość, z którą ustanowiłeś ten Boski Sakrament,</i>
<i>Przez Twoją drogocenną Krew, którą pozostawiłeś nam na ołtarzu,</i>
<i>Przez pięć ran Twojego najświętszego Ciała, które dla nas przyjąłeś,</i><br>
<i>Prosimy Cię my, grzesznicy,<b>wysłuchaj nas, Panie</b></i>
<i>Prosimy Cię, abyś wzmocnił w nas i zachował wiarę, cześć i nabożeństwo do tego przedziwnego Sakramentu.</i>
<i>Prosimy Cię, abyś doprowadził nas poprzez szczerą  spowiedź do częstego przyjmowania Eucharystii.</i>
<i>Prosimy Cię, abyś uwolnił nas od wszelkich błędów, wiarołomstwa i ślepoty serca.</i>
<i>Prosimy Cię, abyś nam udzielił drogocennych i  niebiańskich owoców tego Najświętszego Sakramentu.</i>
<i>Prosimy Cię, abyś tym niebiańskim pokarmem na drogę umocnił nas w godzinę śmierci.</i>
<i>Prosimy Cię, Jezu, Synu Boga żywego,</i><br>
<i>Baranku Boży, który gładzisz grzechy świata, przepuść nam, Panie.</i>
<i>Baranku Boży, który gładzisz grzechy świata, wysłuchaj nas, Panie.</i>
<i>Baranku Boży, który gładzisz grzechy świata, zmiłuj się nad nami, Panie.</i><br>
<i>Módlmy się.</i>
<i>Boże, Ty w Najświętszym Sakramencie zostawiłeś nam pamiątkę swej Męki, daj nam taką czcią otaczać święte tajemnice Ciała i Krwi Twojej, abyśmy nieustannie doznawali owoców Twego odkupienia. Który żyjesz i królujesz na wieki wieków. Amen</i> (Anamnesis 93, s. 24-25).<br>
<b>Lektura Duchowa</b>
<i>„Nie ukrywa się ona pod blaskiem diamentu czy innego drogocennego kamienia, dlatego, iż nie chce pozostawać z człowiekiem jedynie na sposób zewnętrzny. Ukrywa się natomiast pod postacią kawałka chleba, pokarmu człowiekowi właściwego, aby, będąc przez człowieka spożyta, wejść aż do jego serca, żeby w nim znaleźć upodobanie."</i>
św. Ludwik Maria Grignion de Montfort, <i>Miłość Mądrości Przedwiecznej</i>, 71<br>
<b>Zadanie!</b>
Przed przyjęciem Komunii Świętej zaproszę Maryję, aby była w moim sercu, gdy przyjdzie tam Jezus, Jej Syn, obecny w Eucharystii. Ona pomoże mi godnie z żywą wiarą, przyjąć i uczcić Jezusa.<br>`;

static trescDzien6: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie i nieustannego przebywania w Twym Niepokalanym Sercu.</i><br><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„Gdy Elżbieta usłyszała pozdrowienie Maryi, poruszyło się dzieciątko w jej łonie, a Duch Święty napełnił Elżbietę. Wydała ona głośny okrzyk i powiedziała: «Błogosławionaś Ty między niewiastami i błogosławiony jest owoc Twojego łona. A skądże mi to, że Matka mojego Pana przychodzi do mnie? Oto bowiem, skoro głos Twego pozdrowienia zabrzmiał w moich uszach, poruszyło się z radości dzieciątko w moim łonie. Błogosławiona [jest], która uwierzyła, że spełnią się słowa powiedziane Jej od Pana»" </i>(Łk 1,41-45).<br>
<b>Rozważania</b>
Gdy nasza Matka Maryja objawiła się 13 maja 1917 r. w Fatimie, rozłożyła swe ręce i rozbłysło światło. „To światło dotarło do naszego wnętrza, do najgłębszej głębi duszy i spowodowało, żeśmy się widzieli w Bogu, który jest tym światłem, wyraźniej niż w najlepszym zwierciadle" - zapisała Łucja (cytaty z objawienia w Fatimie pochodzą z sekretariatfatimski.pl). Osobiste spotkanie z Matką Bożą zawsze wnosi światło w mroki naszego życia. Przynosi nam poznanie prawdy o sobie, tak jak widzi nas Bóg. Jak się spotkać z Maryją, aby zanurzyć się w tym świetle? Odpowiedź odnajdujemy 13 czerwca 1917 r., „kiedy to po odmówieniu różańca z Hiacyntą, Franciszkiem i innymi osobami, które były obecne, zobaczyliśmy znowu odblask światła, które się zbliżało" - wspomina Łucja. Po odmówieniu różańca... Różaniec generuje światło! Dlatego Maryja niestrudzenie wzywa nas do modlitwy różańcowej. W Fatimie obiecuje, że różaniec przyniesie pokój światu pogrążonemu w mrokach I wojny światowej, która zabiła 8 mln ludzi, a 6 mln uczyniła kalekami.<br>
Orędzie fatimskie nie jest jednak przesłaniem skupionym jedynie na prywatnej pobożności, choć Maryja - jak prawdziwa Matka - widzi potrzeby swoich pojedynczych dzieci i obiecuje uzdrowienie poszczególnym osobom, jeśli wytrwają na modlitwie różańcowej. Centralnym przesłaniem Maryi w Fatimie jest wołanie o modlitwę i pokutę wobec dramatycznej sytuacji moralnej świata. W trzeciej części tajemnicy czytamy: „Po lewej stronie Naszej Pani nieco wyżej Anioła trzymającego w lewej ręce ognisty miecz; iskrząc się wyrzucał języki ognia, które zdawało się, że podpalą świat; ale gasły one w zetknięciu z blaskiem, jaki promieniował z prawej ręki naszej Pani w jego kierunku; Anioł wskazując prawą ręką ziemię, powiedział mocnym głosem: Pokuta, Pokuta, Pokuta!". Niepokalana z mocą i autorytetem wchodzi w świat polityki, której skutków nie mogli przewidzieć ówcześni analitycy. Pani z Nieba przychodzi pod koniec pierwszej wojny światowej, kiedy ludzie nie mogli nawet się domyślać, że grozi im o wiele gorsza, druga wojna światowa, która pochłonie 75 mln istnień ludzkich.<br>
Wydarzeniem zapowiadającym nieuchronność tych słów, „jeśli ludzie nie przestaną obrażać Boga", miał być fenomen świetlny - zorza polarna, która rozbłysła nad Europą i Ameryką Północną w nocy 25 stycznia 1938 r. „Kiedy pewnej nocy ujrzycie nieznane światło, wiedzcie, że jest to wielki znak od Boga, że zbliża się kara na świat za liczne jego zbrodnie, będzie wojna, głód, prześladowanie Kościoła i Ojca Świętego". Są więc dwa rodzaje światła: z Serca Maryi, które rozbłyskuje na modlitwie, oświecając drogi naszego życia, i światło pochodzące ze zjawisk przyrody, jako znak nadejścia Bożej sprawiedliwości.<br>
Przyjście Maryi w Fatimie dotyczy zarówno sytuacji Kościoła, jak i świata. Dlatego tak Kościół, jak i świat nie mogą kolejny raz przejść obojętnie obok tego wydarzenia. Papież Benedykt XVI podczas swojej pielgrzymki do Fatimy 13 maja 2010 r. powiedział: „Łudzi się ten, kto sądzi, że prorocka misja Fatimy się zakończyła". Ta misja trwa i jest to misja światła pośród pogrążonego w mrokach grzechu świata. Matka Boża ostrzega w Fatimie, zarówno przed wojną, jak i przed piekłem. To przesłanie na wskroś ewangeliczne: „Bo cóż za korzyść dla człowieka, jeśli cały świat zyska, a siebie zatraci lub szkodę poniesie" (Łk 9,25).<br>
13 lipca 1917 r. w Fatimie Matka Boża powiedziała do Łucji: „Widzieliście piekło, do którego idą dusze biednych grzeszników. Bóg chce je uratować, Bóg chce rozpowszechnić na świecie nabożeństwo do mego Niepokalanego Serca. Jeżeli uczyni się to, co wam powiem, wielu zostanie przed piekłem uratowanych i nastanie pokój na świecie". Wraz z ogłoszeniem drugiej części tajemnicy fatimskiej Matka Boża zapowiada triumf Jej Niepokalanego Serca, po wypełnieniu wskazanych warunków. Jakie to są warunki?<br>
10 grudnia 1925 r. Maryja z Dzieciątkiem Jezus objawiła się ponownie siostrze Łucji i pokazała jej swoje Serce otoczone cierniami. Dzieciątko powiedziało: „Miej współczucie z Sercem Twej Najświętszej Matki, otoczonym cierniami, którymi niewdzięczni ludzie je wciąż na nowo ranią, a nie ma nikogo, kto by przez akt wynagrodzenia te ciernie powyciągał".<br>
Maryja następnie dodała: „Córko moja, spójrz, Serce moje otoczone cierniami, którymi niewdzięczni ludzie przez bluźnierstwa i niewierności stale ranią. Przynajmniej ty staraj się nieść mi radość i oznajmij w moim imieniu, że przybędę w godzinie śmierci z łaskami potrzebnymi do zbawienia do tych wszystkich, którzy przez pięć miesięcy w pierwsze soboty odprawią spowiedź, przyjmą Komunię świętą, odmówią jeden Różaniec i przez piętnaście minut rozmyślania nad piętnastu tajemnicami różańcowymi towarzyszyć mi będą w intencji zadośćuczynienia". Tak powstaje Nabożeństwo wynagradzające Pierwszych Sobót.<br><br>Maryja w Fatimie składa największą i najwspanialszą obietnicę naszych czasów: „Na koniec jednak moje Niepokalane Serce zatriumfuje". Będzie to tryumf światła, objawiającego Prawdę! Wtedy przez pewien czas zapanuje pokój na świecie. To jednak za jakiś czas. Teraz jeszcze jest czas walki. Matka Boża nie podaje nam do ręki scenariusza z politycznym kalendarzem, lecz daje nam do ręki różaniec. „Chcę, abyście nadal przychodzili do Cova da Iria i odmawiali codziennie różaniec". Zażyłość z Matką Bożą na modlitwie stwarza „miejsce bezpieczne" naszego życia: „moje Niepokalane Serce będzie twoją ucieczką i drogą, która cię zaprowadzi do Boga".<br>
Maryja w Fatimie, przedstawia Boży plan ocalenia ludzkości przed grożącą jej karą i zapowiadaną w Apokalipsie bitwę między Nią a Smokiem. To nie zapowiedź zniszczenia, ale ocalenia świata, o którym czytamy w Księdze proroka Zachariasza: „I tę trzecią część poprowadzę przez ogień, oczyszczę ją, jak oczyszcza się srebro, i wypróbuję tak, jak złoto próbują. I wzywać będzie mego imienia - a Ja wysłucham, i będę mówił: Oto mój lud, a on powie: Pan moim Bogiem" (Za 13,9). Jan Paweł II miał pewność, że „Tylko Bóg wie, jaka będzie przyszłość. Wiemy jednak, że w każdym przypadku będzie to przyszłość łaski; dla całej ludzkości i dla każdego z nas będzie to wypełnienie się Bożego zamysłu miłości. Dlatego patrząc w przyszłość jesteśmy pełni ufności i nie poddajemy się lękowi" (Jan Paweł II, 1997).<br>
Niepokalane Serce Maryi jest naszym pewnym schronieniem. Wejście do tej arki schronienia dokonuje się przez pełne zaufania ofiarowanie Jej naszych serc.<br>
<b>Modlitwa Św. Jana Pawła II o uwolnienie świata od wszelkiego zła</b>
<i>O Serce Niepokalane! Pomóż przezwyciężyć grozę zła, która tak łatwo zakorzenia się w sercach współczesnych ludzi - zła, które w swych niewymiernych skutkach ciąży już nad naszą współczesnością i zdaje się zamykać drogi ku przyszłości!</i>
<i>Od głodu i wojny, wybaw nas!</i>
<i>Od wojny atomowej, od nieobliczalnego samozniszczenia, od wszelkiej wojny, wybaw nas!</i>
<i>Od grzechów przeciw życiu człowieka od jego zarania, wybaw nas!</i>
<i>Od nienawiści i podeptania godności dzieci Bożych, wybaw nas!</i>
<i>Od wszelkich rodzajów niesprawiedliwości w życiu społecznym, państwowym i międzynarodowym, wybaw nas!</i>
<i>Od deptania Bożych przykazań, wybaw nas!</i>
<i>Od usiłowań zdeptania samej prawdy o Bogu w sercach ludzkich, wybaw nas!</i>
<i>Od przytępienia wrażliwości sumienia na dobro i zło, wybaw nas!</i>
<i>Od grzechów przeciw Duchowi Świętemu, wybaw nas, wybaw nas!</i><br>
<i>Przyjmij, o Matko Chrystusa, to wołanie nabrzmiałe cierpieniem wszystkich ludzi! Nabrzmiałe cierpieniem całych społeczeństw!</i>
<i>Pomóż nam mocą Ducha Świętego przezwyciężać wszelki grzech: grzech człowieka i „grzech świata", grzech w każdej jego postaci. Niech jeszcze raz objawi się w dziejach świata nieskończona zbawcza potęga Odkupienia: potęga Miłości miłosiernej! Niech powstrzyma zło! Niech przetworzy sumienia! Niech w Sercu Twym Niepokalanym odsłoni się dla wszystkich światło Nadziei!</i><br>
<i><b>Matko Kościoła, okaż się nam Matką!</b></i>
<i>Idąc śladami św. Jana Pawła II i kardynała Stefana Wyszyńskiego oddajemy Ci jeszcze raz naszą Ojczyznę, Europę i całą rodzinę ludzką. Bądź nam Matką Nadziei.</i>
<i>Amen!</i><br>
<b>Lektura Duchowa</b>
<i>„Przez Maryję rozpoczęło się zbawienie świata i przez Maryję musi się ono dopełnić. Przy pierwszym przyjściu Jezusa Chrystusa Maryja prawie wcale się nie ukazywała, aby ludzie, którzy o osobie Jej Syna mało jeszcze wiedzieli, nie przywiązywali się do Niej zbyt ziemskim i przyrodzonym uczuciem, oddalając się przez to od prawdy. A gdyby Maryja bardziej była znana, niezawodnie by to nastąpiło, z powodu cudownego Jej wdzięku, którym Najwyższy także na zewnątrz Ją ozdobił. Toteż Dionizy Pseudo-Areopagita pisze, iż gdy Ją ujrzał, z powodu Jej tajemniczego uroku i niezrównanej piękności byłby wziął Ją za bóstwo, gdyby wiara, w której był ugruntowany, nie pouczyła go, że Ona nim nie jest. Natomiast przy drugim przyjściu Jezusa Chrystusa Maryja musi być znana i przez Ducha Świętego objawiona, aby to przez Nią Chrystusa poznano, kochano i Mu służono, albowiem powody, dla których Duch Święty ukrył swoją Oblubienicę za Jej życia ziemskiego, dając w Ewangelii tak szczupłe o Niej objawienie, już istnieć nie będą".</i>
św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i>, 49<br>
<b>Zadanie</b>
Spełniając życzenie Matki Bożej, postanowię w najbliższym czasie odprawić 5 pierwszych sobót miesiąca.<br>`;


static trescDzien7: string = `<i>Maryjo, Oblubienico Ducha Świętego, wyproś mi łaskę poznania Ciebie i udziału w tryumfie Twego Niepokalanego Serca.</i><br><i>Amen!</i><br>
<b>Słowo Boże</b>
<i>„I nastąpiła walka na niebie: Michał i jego aniołowie mieli walczyć ze Smokiem. I wystąpił do walki Smok i jego aniołowie, ale nie przemógł, i już się miejsce dla nich w niebie nie znalazło. I został strącony wielki Smok, Wąż starodawny, który się zwie diabeł i szatan, zwodzący całą zamieszkałą ziemię; został strącony na ziemię, a z nim strąceni zostali jego aniołowie. I usłyszałem donośny głos mówiący w niebie: «Teraz nastało zbawienie, potęga i królowanie Boga naszego i władza Jego Pomazańca, bo oskarżyciel braci naszych został strącony, ten, co dniem i nocą oskarża ich przed Bogiem naszym. A oni zwyciężyli dzięki krwi Baranka i dzięki słowu swojego świadectwa, i nie umiłowali dusz swych - aż do śmierci. Dlatego radujcie się, niebiosa i ich mieszkańcy! Biada ziemi i morzu - bo zstąpił do was diabeł, pałając wielkim gniewem, świadom, że mało ma czasu».</i> (...)<br>
<i>I rozgniewał się Smok na Niewiastę,i odszedł rozpocząć walkę z resztą jej potomstwa, z tymi, co strzegą przykazań Boga i mają świadectwo Jezusa"</i> (Ap 12,7-12; 12,17).<br>
<b>Rozważanie</b>
Św. Amadeusz, biskup Lozanny (†1159), kontemplując płonący w Sercu Maryi ogień Bożej miłości, sięga w zachwycie po cudowne porównanie: „Płonęłaś jak gorejący krzew, który niegdyś ujrzał Mojżesz, płonęłaś, ale się nie spalałaś", a następnie przyrównuje miłość płynąca z Serca Matki Bożej do rwącego ognistego strumienia, który „wpędza piekło w przerażenie". Potęga przeciwieństw: ognia i wody, jednoczą się w potędze miłości Serca Maryi. W prorockim widzeniu św. Amadeusz mówi dalej w swoim kazaniu: „Dla Jej niezrównanej miłości Boga przypadnie Jej szczególna rola w walce z szatanem, a nawet udział w sądzie ostatecznym" (św. Amadeusza cytuje dwa razy papież Pius XII w encyklice <i>Munificentissimus Deus</i>, w której ogłasza dogmat o Wniebowzięciu NMP). Bóg powierzył swojej i naszej Matce, nowej Ewie, Niepokalanej Dziewicy, obleczonej w promienie jasności Nieba, zadanie prowadzenia duchowej walki, gdy „wzmoże się nieprawość i oziębnie miłość wielu" (por. Mt 24,12). Chrystusowi chcemy poświecić nasze życie na wzór i z pomocą Maryi, aby być do Jego wyłącznej dyspozycji. Chcemy stać się sługami Tryumfu Niepokalanego Serca Maryi, zgodnie z Wolą Boga.<br>
Wielkim apostołem Matki Bożej Zwycięskiej jest św. Ludwik Maria Grignion de Montfort. W swoim <i>Traktacie o doskonałym nabożeństwie do Najświętszej Maryi Panny</i>", pisze: „Wreszcie, Bóg pragnie, by Jego Najświętsza Matka była obecnie więcej znana, bardziej kochana i czczona bardziej niż kiedykolwiek. Bez wątpienia, nastąpi to gdy wybrani rozpoczną za łaską Ducha Świętego tę wewnętrzną i doskonałą praktykę; którą im zaraz przedstawię. Wtedy ujrzą, o ile wiara na to pozwala, tę piękną Gwiazdę Morza, by pod Jej kierunkiem mimo burz i rozbojów morskich dopłynąć szczęśliwie do portu. Wtedy poznają wspaniałość tej Królowej i poświęcą się całkowicie Jej służbie jako poddani i niewolnicy z miłości. Doświadczą Jej słodyczy i pieszczot matczynych i kochać Ją będą czule jako ukochane dzieci" (św Ludwik, <i>Traktat</i>, 55). Dlaczego św. Ludwik pisze, że będą to „wybrani", a nie wielu lub wszyscy? Dlatego, że nie jest łatwo stać się „poddanym i niewolnikiem miłości".<br>
"Znaczenie słowa «niewola», tak dotkliwie dla Polaków, kryje w sobie podobny paradoks, jak słowa Ewangelii o własnym życiu, które trzeba stracić, ażeby je zyskać (por. Mt 10, 39). Wolność jest wielkim darem Bożym. Trzeba go dobrze używać. Miłość stanowi spełnienie wolności, a równocześnie do jej istoty należy przynależeć, czyli - nie być wolnym ale raczej - być wolnym w sposób dojrzały! Jednakże tego «niebycia wolnym» w miłości, nigdy nie odczuwa się jako niewolę. Nie odczuwa jako niewolę matka, że jest uwiązana przy chorym dziecku, lecz jako afirmację swojej wolności, jako jej spełnienie. Wtedy jest najbardziej wolna! Oddanie w niewolę wskazuje więc na «szczególną zależność», na świętą zależność i na «bezwzględną ufność». Bez tej zależności świętej, bez tej ufności heroicznej, życie ludzkie jest nijakie!" (św. Jan Paweł II w czasie I pielgrzymki do Polski, str 18/19)<br>
Św. Ludwik wskazuje na atrybuty, tych którzy oddając się Jej całkowicie, nie będą wchodzić w kompromisy ze światem: „W prawej ręce krucyfiks, różaniec w lewej, święte imiona Jezusa i Maryi na sercu, a skromność i umartwienie Jezusa Chrystusa zajaśnieje w całym ich postępowaniu. Takimi oto będą owi wielcy mężowie, którzy się pojawią, a których Maryja ukształtuje i wyposaży na rozkaz Najwyższego" (św. Ludwik, <i>Traktat</i>..., 55). Krzyż i różaniec, modlitwa w sercu i prawe postepowanie. Oto atrybuty nowego maryjnego pokolenia.<br>
Krzyż musi być znów postawiony w centrum. W świecie, gdzie rządzi „książę tego świata", który jest „ojcem kłamstwa" - ciągle wygrywa egoizm i złudzenia. Dlatego potrzebujemy interwencji Nieba, bo sami już sobie nie poradzimy. Potrzebujemy przemieniającego i oczyszczającego Ognia Ducha Świętego, który zapłonął w Niepokalanym Sercu Maryi, a wtedy, jak obiecuje św. Ludwik: „Poznają miłosierdzie, którego Maryja jest pełna; poznają, jak bardzo potrzebują Jej pomocy i będą we wszystkim uciekać się do Niej, jako do swojej ukochanej Orędowniczki i Pośredniczki u Jezusa Chrystusa. Zrozumieją, że Maryja jest najpewniejszym, najkrótszym i najdoskonalszym środkiem, by dojść do Jezusa Chrystusa, i oddadzą się Jej z duszą i ciałem, niepodzielnie i bez zastrzeżeń, by zupełnie i niepodzielnie należeć do Jezusa Chrystusa" (św. Ludwik, <i>Traktat</i>..., 55).<br>
<b>Ofiarowanie się do dyspozycji Niepokalanemu Sercu Maryi</b>
<i>O Najczystsza spośród wszystkich, Maryjo Dziewico i Matko! Tworząc wspólnotę jednego serca i jednego ducha z wszystkimi, którzy oddają się Tobie do wyłącznej dyspozycji w Wieczerniku Twego Niepokalanego Serca, proszę abym mógł doświadczyć łaski oczyszczenia i uświęcenia w Prawdzie.</i>
<i>Arko Nowego Przymierza, trwając jednomyślnie na modlitwie w jedności z wszystkimi Chórami Aniołów i Świętymi w niebie, ofiaruję się w posłuszeństwie Duchowi Świętemu do całkowitej dyspozycji Twojego Niepokalanego Serca.</i>
<i>Maryjo, tylko Twoja nieskalana Krew i Twoje dziewicze Serce były godne przyjąć Syna Bożego! Twoja Krew, o Matko Boża, ukształtowała Krew Chrystusa! Twoje Serce uformowało Jego Serce! Niech Jego Najdroższa Krew oczyści nas i wybawi od każdego zła.</i>
<i>Panno Maryjo, Matko Boża, proś Jezusa za nami.</i>
<i>Oto ja, biedny grzesznik, składam moje słabe, skażone grzechem serce do Twojego przeczystego Serca. Przyjmij mnie na zawsze, uchwyć mnie mocno i nie wypuszczaj nigdy z Twoich litościwych rąk, bym potrafił ustrzec się przed samym sobą i ukryć się w cieniu Twego zmiłowania.</i>
<i>Panno Maryjo, Matko Boża, proś Jezusa za nami.</i>
<i>Składając dziś w Twoim Niepokalanym Sercu swoje życie i śmierć, to co czynię i czego doznaję, moje myśli, słowa i uczynki, przez Twoje Serce i Twoimi dłońmi to wszystko poświęcam Bogu Ojcu Wszechmogącemu!</i><br>
<i>Chcę tak kochać, jak Ty kochasz.</i>
<i>Chcę się tak ofiarować, jak Ty się ofiarowujesz.</i>
<i>Chcę tak zachować wewnętrzne milczenie, jak Ty je zachowujesz.</i>
<i>Chcę tak przebaczać, jak Ty przebaczasz.</i>
<i>Chcę być tak wiernym, jak Ty jesteś wierną.</i><br>
<i>Prowadź mnie do Serca naszego Pana i Boga, do Serca Najświętszego, które jest całym naszym dążeniem i szczęściem wiecznym.</i>
<i>Panno Maryjo, Matko Boża, proś Jezusa za nami.</i>
<i>Także i was o święci i możni Aniołowie, proszę, byście pomnąc na to osobiste poświęcenie Maryi, Matce Bożej, wciąż przypominali mi o nim, upominali i ostrzegali mnie, kierowali mną i nigdy nie pozwolili upaść, aby całe moje życie i postępowanie stawało się coraz bardziej odblaskiem Jej czystości, wielkości i miłości.</i><br>
<i>Błogosławiona Pani, uczyń nam tę łaskę, abyśmy o Tobie zawsze pamiętali,</i>
<i>Dziewico i Matko, Matko i Dziewico. Amen.</i>
<i>Przyjdź Duchu Święty, przyjdź przez potężne wstawiennictwo Niepokalanego Serca Maryi, Twojej umiłowanej Oblubienicy! Amen.</i><br>
<b>Lektura Duchowa</b>
„Bóg zatem pragnie Maryję, Arcydzieło rąk swoich, w owych czasach ostatecznych objawić i odsłonić:<br>
1) Ponieważ sama ukrywała się na tym świecie i w swej głębokiej pokorze uniżała się bardziej niż proch, uzyskawszy u Pana Boga, u apostołów i ewangelistów to, że zamilczeli o Jej życiu.<br>
2) Ponieważ Maryja jest Arcydziełem rąk Bożych, tak na ziemi przez łaskę, jak w niebie przez chwałę, Bóg chce, by Go w Niej za to wielbiono na ziemi i wśród żyjących wysławiano.<br>
3) Ponieważ Maryja jest Jutrzenką, poprzedzającą i odsłaniającą Słońce sprawiedliwości, Jezusa Chrystusa, dlatego powinna być poznana i objawiona, by przez to Jezus Chrystus był poznany i uwielbiony.<br>
4) Ponieważ Maryja jest drogą, którą Jezus Chrystus przyszedł do nas po raz pierwszy, będzie nią i wtedy, kiedy Chrystus przyjdzie powtórnie, choć nie w ten sam sposób.<br>
5) Ponieważ Maryja jest środkiem pewnym, drogą prostą i niepokalaną, by dojść do Chrystusa i znaleźć Go niezawodnie, dlatego święte dusze, które mają szczególną zabłysnąć świętością, muszą znaleźć Jezusa przez Maryję. Kto Ją znajdzie, znajdzie Życie, to znaczy Jezusa Chrystusa, który jest Drogą, Prawdą i Życiem (J 14,6) Nie można jednak znaleźć Maryi, nie szukając Jej; nie można Jej szukać, nie znając Jej, gdyż nikt nie szuka, ani nie pragnie, czego nie zna. Konieczne jest więc, by Maryję znano więcej niż kiedykolwiek, ażeby Trójca Przenajświętsza jak najwięcej była znana i wielbiona.<br>
6) Maryja musi w owych czasach ostatecznych więcej niż kiedykolwiek zajaśnieć miłosierdziem, mocą i łaską. Musi zajaśnieć miłosierdziem, by przyprowadzić do owczarni Chrystusowej i miłośnie przygarnąć biednych grzeszników i zbłąkanych, którzy nawrócą się i powrócą do Kościoła katolickiego. Musi zajaśnieć mocą przeciw nieprzyjaciołom Boga, (...), którzy będą się strasznie buntować i wytężą wszystkie siły, żeby tych, co się im przeciwstawią, skusić i doprowadzić do upadku obietnicami lub groźbami. Wreszcie, musi zajaśnieć łaską, by dodać otuchy i męstwa walecznym żołnierzom i wiernym sługom Jezusa Chrystusa, którzy będą walczyć w Jego sprawie.<br>
7) Na koniec, Maryja musi być groźna jak zbrojne zastępy (Pnp 6,10), straszna jak wojsko gotowe do boju przeciw szatanowi i jego wspólnikom, głównie w owych czasach ostatnich, gdyż szatan wiedząc dobrze, że mało, o wiele mniej niż kiedykolwiek pozostaje czasu (zob. Ap 12,12), by gubić dusze, będzie codziennie podwajać swe wysiłki i zakusy. Wznieci więc on okrutne prześladowanie i pocznie zastawiać straszne zasadzki na wierne sługi i na prawdziwe dzieci Maryi, które mu o wiele trudniej pokonać niż innych".
Św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i>, 50<br>
<b>Zadanie</b>
Spełniając życzenie Matki Bożej, codziennie będę odmawiał różaniec.<br>`;

static dzien0: string = `${SecondWeekTexts.tytul} <b>Wprowadzenie</b><br>
<i>"W czasie drugiego tygodnia starać się będą we wszystkich swych modlitwach i uczynkach o to, by poznawać Najświętszą Dziewicę. O to poznanie prosić będą Ducha Świętego"</i>
św. Ludwik Maria Grignion de Montfort, <i>Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny</i> 229<br>
<b>Wprowadzenie</b><br>
Każdy człowiek nosi w sercu tęsknotę za Bogiem. Nawet jeśli nie ma wiary, samo szukanie sensu istnienia, niekiedy samotność i smutek zdradzą tę tęsknotę. Św. Augustyn pisał: „Stworzyłeś nas (...) jako skierowanych ku Tobie. I niespokojne jest serce nasze, dopóki w Tobie nie spocznie" (Wyznania I, 1, tłum. Zygmunt Kubiak). Grzech pierworodny pozbawił człowieka także oglądania Boga. Ale nasz Ojciec Niebieski nie pozostawił nas bez pomocy. Sam stał się człowiekiem i przyszedł do nas na ziemię wygnania, aby nas odzyskać, odkupić z niewoli szatana. Już w raju ukazał człowiekowi Nadzieję, powiedział do węża: „Wprowadzam nieprzyjaźń między ciebie a niewiastą, pomiędzy potomstwo twoje, a potomstwo jej" (Rdz 3,15). Bóg przychodzi na ziemię przez zapowiedziana w raju Niewiastę. "A Dziewicy było na imię Maryja" (Łk 1,27). W Niej Bóg stał się człowiekiem. Nie ma więc pewniejszej drogi do Boga, jak z Nią, w Niej i przez Nią. Maryję Bóg uczynił Arcydziełem, nowym stworzeniem, początkiem nowego świata, bo Ona rodzi Chrystusa, nie tylko przed wiekami, ale także teraz ,jako Oblubienica Ducha Świętego w każdej duszy ludzkiej. Kolejne dni, które są przed nami, mają pomóc nam poznać przywileje i zasługi Matki Bożej, odkryć na nowo piękno Jej życia z Bogiem, a na koniec z odwagą podjąć swoją osobistą decyzję pójścia drogą Maryi, aby Ona zjednoczyła nasz ze swoim Synem więzami nieodwołalnej miłości. Tryumf Serca Maryi w świecie musi zacząć się w naszym sercu. Zawierzenie Maryi ma prowadzić nas do całkowitej zgodności naszych życiowych postaw i decyzji z wolą Bożą. Na tym właśnie polega doskonałe nabożeństwo do Najświętszej Maryi Panny.`;

// bierze stały fragment tytuł rozdziłu dzien podtytuł,dodaje modlitwe do Ducha św, potem bierze tresc danego dnia  i true dodaje modlitwe zawierzenia
static dzien1: string = SecondWeekTexts.getDayText(1, SecondWeekTexts.trescDzien1, true);
static dzien2: string = SecondWeekTexts.getDayText(2, SecondWeekTexts.trescDzien2, true);
static dzien3: string = SecondWeekTexts.getDayText(3, SecondWeekTexts.trescDzien3, true);
static dzien4: string = SecondWeekTexts.getDayText(4, SecondWeekTexts.trescDzien4, true);
static dzien5: string = SecondWeekTexts.getDayText(5, SecondWeekTexts.trescDzien5, true);
static dzien6: string = SecondWeekTexts.getDayText(6, SecondWeekTexts.trescDzien6, true);
static dzien7: string = SecondWeekTexts.getDayText(7, SecondWeekTexts.trescDzien7, true);
}
