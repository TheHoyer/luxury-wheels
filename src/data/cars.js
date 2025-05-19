// src/data/cars.js

// =======================================================================
//  Struktura Danych Samochodu
// =======================================================================
// id:                  Unikalny numer identyfikacyjny
// make:                Marka (np. "Lamborghini")
// model:               Model (np. "Huracán EVO")
// year:                Rok produkcji (opcjonalnie, jeśli dostępny)
// imageUrl:            Ścieżka do głównego zdjęcia (dla karty i strony szczegółów)
// logoUrl:             Ścieżka do logo marki (SVG)
// specHighlights:      Obiekt z kluczowymi specyfikacjami do szybkiego wyświetlenia
//    power:            Moc (np. "640 KM")
//    acceleration:     0-100 km/h (np. "2,9 s")
//    gearbox:          Skrzynia biegów (np. "Automatyczna")
//    drive:            Napęd (np. "4x4")
//    engineType:       Typ silnika (np. "5.2L V10")
//    maxSpeed:         Prędkość maksymalna (np. ">325 km/h")
// description:         Główny opis marketingowy pojazdu
// technicalData:       Obiekt z bardziej szczegółowymi danymi technicznymi
//    (klucze jak w specHighlights lub inne dodatkowe)
// equipment:           Tablica stringów z listą wyposażenia
// galleryImages:       Tablica stringów ze ścieżkami do zdjęć do galerii/slidera
// pricing:             Obiekt z informacjami o cenniku
//    deposit:          Kaucja (liczba lub null/0 jeśli nie ma)
//    tiers:            Tablica obiektów z progami cenowymi: { duration: "opis", price: liczba }
//    mileage:          Tablica obiektów z limitami przebiegu: { duration: "opis", limit: "opis km" }
//    hasMultipleOptions: (Opcjonalnie, true dla Porsche) Flaga wskazująca różne opcje cenowe
//    options:          (Tylko dla Porsche) Obiekt z różnymi opcjami cenowymi
// =======================================================================

const CARS_DATA = [
    // --- 1. Lamborghini Huracán EVO ---
    {
      id: 1,
      make: "Lamborghini",
      model: "Huracán EVO",
      // year: 2021, // Brak w dostarczonych danych dla tego auta
      imageUrl: "/images/Huracan_Evo/Lamborghini-Huracan-Evo-bok.jpg", // Główne zdjęcie
      logoUrl: "/images/Huracan_Evo/lamborghini.svg",
      specHighlights: {
        power: "640 KM",
        acceleration: "2,9 s",
        gearbox: "Automatyczna",
        drive: "4x4",
        engineType: "5.2L V10",
        maxSpeed: ">325 km/h",
      },
      description: `Lamborghini przy projektowaniu modelu Huracan Evo skupiło się na dopracowaniu istniejącej konstrukcji. Celem włoskiego producenta było poprawienie parametrów auta, z jednoczesnym uzyskaniem jeszcze większej ilości adrenaliny z jego prowadzenia. Charakterystyczny grill, ostry kształt reflektorów i aerodynamiczne akcenty podkreślają wyjątkowy charakter modelu.\n\nModel Huracan bazuje na wersji Performante, dzięki czemu m.in. uzyskuje dodatkowe 30KM i 40Nm względem „zwykłego” Huracana. To oczywiście nie wszystkie zmiany, jakie przeszedł ten pojazd. Dowiedz się co zyskujesz decydując się na wypożyczenie Lamborghini Huracan w tej wersji.`,
      technicalData: {
        power: "640 KM",
        acceleration: "2,9 s",
        gearbox: "Automatyczna",
        drive: "4x4",
        engineType: "5.2L V10",
        maxSpeed: ">325 km/h",
        // Można dodać więcej, jeśli znajdziesz
      },
      equipment: [
        "Kamera cofania",
        "System podnoszenia przodu",
        "Podgrzewane fotele",
        "Hamulce Karbonowo-ceramiczne",
        "Fotele w pełni elektryczne",
      ],
      galleryImages: [
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-bok.jpg",
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-deska-rozdzielcza.jpg",
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-linia.jpg",
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-przod.jpg",
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-silnik-e1659606988238.jpg",
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-Sylwetka.jpg",
        "/images/Huracan_Evo/Lamborghini-Huracan-Evo-tyl.jpg",
      ],
      pricing: {
        deposit: 30000,
        tiers: [
          { duration: "1 doba", price: 5000 },
          { duration: "2-3 doby", price: 4200 },
          { duration: "4-6 dób", price: 3800 },
          { duration: "7-13 dób", price: 3000 },
          { duration: "14-29 dób", price: 2100 },
          { duration: "Miesiąc", price: 45000 }, // Cena za miesiąc podana jako całość
        ],
        mileage: [
          { duration: "do 6 dni", limit: "100 km / doba" },
          { duration: "od 7 do 13 dni", limit: "85 km / doba" },
          { duration: "od 14 do 29 dni", limit: "65 km / doba" },
          { duration: "od 30 dni", limit: "50 km / doba" },
        ]
      }
    },
  
    // --- 2. Ferrari 812 Superfast ---
    {
      id: 2,
      make: "Ferrari",
      model: "812 Superfast",
      // year: ???, // Brak w danych
      imageUrl: "/images/Ferrari812/Ferrari-812-SUPERFAST-bok.jpg",
      logoUrl: "/images/Ferrari812/ferrari.svg",
      specHighlights: {
        power: "800 KM",
        acceleration: "2,9 s",
        gearbox: "Automatyczna",
        drive: "RWD", // Tylny napęd
        engineType: "6.5L V12",
        maxSpeed: "340 km/h",
      },
      description: `Ferrari 812 Superfast to następca słynnego modelu F12. Zawsze podczas premiery nowego, flagowego modelu włoskiej marki, oczekiwania fanów motoryzacji są olbrzymie. Czy producent z Maranello spełnił te oczekiwania? Zdecydowanie, 812 jest po prostu pod każdym względem jeszcze bardziej dopracowane – i co wyjątkowo ważne w dzisiejszych czasach, dostarcza jeszcze więcej adrenaliny z jazdy!`,
      technicalData: {
        power: "800 KM",
        acceleration: "2.9 s",
        gearbox: "Automatyczna",
        drive: "RWD",
        engineType: "6.5L V12",
        maxSpeed: "340 km/h",
      },
      equipment: [
        "Czarne końcówki wydechu",
        "Fotele Elektryczne",
        "Hamulce Karbonowo-Ceramiczne",
        "Kamera Przód i tył",
        "Kierownica Karbonowa",
        "Klimatyzacja Dwustrefowa automatyczna",
        "Nagłośnienie JBL",
        "Symbol \"Prancing horse\" haftowany na zagłówkach",
      ],
      galleryImages: [
        "/images/Ferrari812/Ferrari-812-SUPERFAST-bok.jpg",
        "/images/Ferrari812/Ferrari-812-SUPERFAST-deska-rozdzielcza.jpg",
        "/images/Ferrari812/Ferrari-812-SUPERFAST-fotel.jpg",
        "/images/Ferrari812/Ferrari-812-SUPERFAST-przod.jpg",
        "/images/Ferrari812/Ferrari-812-SUPERFAST-sylwetka.jpg",
        "/images/Ferrari812/Ferrari-812-SUPERFAST-tyl.jpg",
        "/images/Ferrari812/Ferrari-812-SUPERFAST-znaczek.jpg",
      ],
      pricing: {
        deposit: 30000,
        tiers: [
          { duration: "1 doba", price: 5000 },
          { duration: "2-3 doby", price: 4700 },
          { duration: "4-6 dób", price: 4200 },
          { duration: "7-13 dób", price: 3200 },
          { duration: "14-29 dób", price: 2300 },
          { duration: "Miesiąc", price: 45000 }, // Cena za miesiąc
        ],
        mileage: [
          { duration: "do 6 dni", limit: "100 km / doba" },
          { duration: "od 7 do 13 dni", limit: "85 km / doba" },
          { duration: "od 14 do 29 dni", limit: "65 km / doba" },
          { duration: "od 30 dni", limit: "50 km / doba" },
        ]
      }
    },
  
    // --- 3. Porsche 911 Carrera 4 GTS Black ---
    {
      id: 3,
      make: "Porsche",
      model: "911 Carrera 4 GTS Black",
      // year: ???, // Brak w danych
      imageUrl: "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-bok.jpg",
      logoUrl: "/images/Porsche911/porsche.svg",
      specHighlights: {
        power: "541 KM", // Uwaga: W specyfikacji jest 541KM, w danych tech 541KM. Trzymam się specyfikacji.
        acceleration: "3,0 s", // Uwaga: W specyfikacji jest 3,0s, w danych tech 3,0s.
        gearbox: "Automatyczna", // W danych tech jest "Automatyczna PDK"
        drive: "4x4",
        engineType: "3.6L", // W specyfikacji jest 3.6L, w danych tech 3.6L
        maxSpeed: "312 km/h",
      },
      description: `Najnowsza generacja Porsche 911 Carrera 4 GTS to kolejna ewolucja kultowego modelu. Porsche nie zdecydowało się na ryzykowną rewolucję, postawiło na zachowanie klasycznych dla 911 elementów, ulepszając przy tym pod wieloma względami znaną nam konstrukcję.`,
      technicalData: {
        power: "541 KM",
        acceleration: "3,0 s",
        gearbox: "Automatyczna PDK",
        drive: "4x4",
        engineType: "3.6L", // Potwierdzenie
        maxSpeed: "312 km/h",
      },
      equipment: [
        "Apple Car Play",
        "Elektrycznie uchylany szyberdach",
        "Fotele Adaptacyjne sportowe Plus (18-kierunkowa regulacja, pamięć)",
        "Nagłośnienie BOSE® Surround Sound System",
        "Pakiet Aerodynamiczny (Aerokit)",
        "Pakiet Sport Chrono",
        "Podgrzewane fotele",
        "Kierownica Sportowa GT (Race-Tex, podgrzewana, przełącznik trybów)",
        "Przyciemniane szyby",
        "Tempomat",
        "Układ podnoszenia przedniej osi",
        "Układ wydechowy Sportowy",
        "Wspomaganie parkowania ParkAssist (przód i tył)",
        "Wykończenie wnętrza Materiał Race-Tex",
        "Zawieszenie Adaptacyjne PASM",
      ],
      galleryImages: [
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-bok.jpg",
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-deska-rozdzielcza.jpg",
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-przod.jpg",
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-spoiler.jpg",
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-sylwetka.jpg",
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-tyl.jpg",
        "/images/Porsche911/Porsche-911-Carrera-4-GTS-Black-wydech.jpg",
      ],
      // Specjalna struktura dla Porsche z dwoma opcjami cenowymi
      pricing: {
        hasMultipleOptions: true, // Flaga wskazująca na opcje
        options: {
          withDeposit: {
            optionLabel: "Wynajem z kaucją (20 000 zł)",
            deposit: 20000,
            tiers: [
              { duration: "1 doba", price: 2400 },
              { duration: "2-3 doby", price: 2150 },
              { duration: "4-6 dób", price: 2000 },
              { duration: "7-13 dób", price: 1650 },
              { duration: "14-29 dób", price: 1200 },
              // Miesiąc dla opcji z kaucją nie podany (?) - użyję wspólnej wartości jeśli to ok
            ],
          },
          withoutDeposit: {
            optionLabel: "Wynajem bez kaucji",
            deposit: 0,
            tiers: [
              { duration: "1 doba", price: 2800 },
              { duration: "2-3 doby", price: 2500 },
              { duration: "4-6 dób", price: 2350 },
              { duration: "7-13 dób", price: 1950 },
              { duration: "14-29 dób", price: 1400 },
            ]
          },
          // Wspólne elementy można umieścić poza options, jeśli są takie same
          monthlyPrice: 34000, // Wspólna cena za miesiąc (?)
        },
        mileage: [ // Limity przebiegu dla Porsche
          { duration: "do 14 dni", limit: "150 km / doba" },
          { duration: "od 14 do 29 dni", limit: "100 km / doba" },
          { duration: "od 30 dni", limit: "65 km / doba" },
        ]
      }
    },
  
    // --- 4. BMW XM ---
    {
      id: 4,
      make: "BMW",
      model: "XM",
      // year: ???, // Brak w danych
      imageUrl: "/images/BmwXM/XM-5-sylwetka.jpg", // Wybrałem sylwetkę jako główne
      logoUrl: "/images/BmwXM/bmw.svg",
      specHighlights: {
        power: "653 KM",
        acceleration: "4,3 s",
        gearbox: "Automatyczna",
        drive: "4x4",
        engineType: "4.4 L", // Zakładam, że V8, ale dane tego nie mówią
        maxSpeed: "250 km/h", // Ograniczona elektronicznie?
      },
      description: `BMW XM to bez dwóch zdań propozycja kontrowersyjna, ale nie można odmówić temu autu, że robi wrażenie – pod różnymi względami! Moc – 653 KM, wartość – siedmiocyfrowa (ponad milion złotych), przyspieszenie – ok. 4s, silnik – jedyny właściwy, czyli 4.4L turbodoładowane V8! Wszystko to w połączeniu z bardzo nowoczesnym designem i faktem, że jest to dopiero drugi model M niemający swojego odpowiednika w „bazowej” gamie BMW. To sprawia, że XM jest wyjątkowy i nieporównywalny.`,
      technicalData: {
        power: "653 KM",
        acceleration: "4,3 s",
        gearbox: "Automatyczna",
        drive: "4x4",
        engineType: "4.4 L V8 Twin-Turbo", // Dodałem V8 na podstawie opisu
        maxSpeed: "250 km/h",
      },
      equipment: [
        "Ambientowe Podświetlenie",
        "Kamera cofania", // Jest w specyfikacji, ale nie w sekcji wyposażenia - dodałem
        "Fotele wentylowane/podgrzewane",
        "Funkcja masażu w fotelu kierowcy i pasażera",
        "Klimatyzacja dwustrefowa",
        "Nagłośnienie Bowers & Wilkins High End Sound System",
        "System wspomagania parkowania Plus",
      ],
      galleryImages: [
        "/images/BmwXM/XM-1-tyl.jpg",
        "/images/BmwXM/XM-10-deska-rozdzielcza.jpg",
        "/images/BmwXM/XM-36-lampa-przod.jpg",
        "/images/BmwXM/XM-39-uklad-wydechowy.jpg",
        "/images/BmwXM/XM-4-przod.jpg",
        "/images/BmwXM/XM-5-sylwetka.jpg",
        "/images/BmwXM/XM-7-bok.jpg",
      ],
      pricing: {
        deposit: 10000,
        tiers: [
          { duration: "1 doba", price: 2800 },
          { duration: "2-3 doby", price: 2500 },
          { duration: "4-6 dób", price: 2350 },
          { duration: "7-13 dób", price: 1950 },
          { duration: "14-29 dób", price: 1400 },
          { duration: "Miesiąc", price: 28000 }, // Cena za miesiąc
        ],
        mileage: [
          { duration: "do 7 dni", limit: "250 km / doba" },
          { duration: "od 7 dni do 30 dni", limit: "150 km / doba" }, // Poprawiono opis zakresu
          { duration: "od 30 dni", limit: "100 km / doba" },
        ]
      }
    },
  // --- 5. Mercedes-AMG G63 Black (Poprawione ścieżki zdjęć na polskie) ---
  {
    id: 5,
    make: "Mercedes-AMG",
    model: "G63 Black",
    // year: undefined, // Rok produkcji nie został podany
    imageUrl: "/images/MercedesG63Black/Mercedes-AMG-G63-sylwetka.jpg", // Główne zdjęcie - widok z boku
    logoUrl: "/images/MercedesG63Black/mercedes-amg.svg", // Logo marki w folderze modelu
    specHighlights: {
      power: "585 KM",
      acceleration: "4,5 s",
      gearbox: "Automatyczna",
      drive: "4x4",
      engineType: "4.0L V8 Biturbo",
      maxSpeed: "220 km/h",
    },
    description: `Historia Mercedesa klasy G sięga 1969 roku. Ideą powstania G klasy było połączenie terenowych zdolności z odpowiednim poziomem komfortu. Obecnie to SUV klasy wyższej, który stał się luksusowy, bardzo mocny i jedyny w swoim rodzaju. \n\nNasz egzemplarz Mercedesa to najmocniejsza wersja G63 z 4-litrowym silnikiem V8 Biturbo o mocy 585 KM i momencie obrotowym 850 Nm. Ten 2.6-tonowy kolos rozpędza się do 100 km/h w zaledwie 4.5 sekundy. Najnowsza generacja W483 wyróżnia się rewelacyjnymi osiągami, sportowym charakterem, poprawionym prowadzeniem oraz nowym poziomem luksusu i wykończenia wnętrza, szczególnie z “Pakietem wnętrza G manufaktur Plus” i “Pakietem Premium Plus”.\n\nNasz egzemplarz w czarnym lakierze z opcjonalnym pakietem night wygląda bardzo “bojowo”, podobnie jak jego osiągi. Przyśpieszenie jest uzależniające, a jazda nim to doświadczenie, którego ciężko porównać do jakiegokolwiek innego auta!`,
    technicalData: {
      power: "585 KM",
      torque: "850 Nm",
      acceleration: "4,5 s",
      gearbox: "Automatyczna",
      drive: "4x4",
      engineType: "4.0L V8 Biturbo",
      maxSpeed: "220 km/h",
    },
    equipment: [
      "Pakiet wnętrza G manufaktur Plus (m.in. ekskluzywna podsufitka designo, deska rozdzielcza obszyta skórą)",
      "Pakiet Premium Plus",
      "System nagłośnieniowy Burmester 3D",
      "Elektrycznie sterowane okno dachowe",
      "Kamera 360 stopni",
      "Pakiet night",
      "Adaptacyjny tempomat Distronic",
      "Asystent martwego pola",
      "Oświetlenie ambiente (64 kolory)",
      "Jonizacja powietrza",
      "Pakiet komfortowych siedzeń Plus",
      "Powiększony zbiornik paliwa (100L)",
    ],
    galleryImages: [
      "/images/MercedesG63Black/Mercedes-AMG-G63-przod.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-sylwetka.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-bok.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-tyl.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-linia.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-wnetrze.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-deska-rozdzielcza.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-widok-kierowcy.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-felga.jpg",
      "/images/MercedesG63Black/Mercedes-AMG-G63-lampa-przod.jpg",
    ],
    pricing: {
      deposit: 30000,
      tiers: [
        { duration: "1 doba", price: 3200 },
        { duration: "2-3 doby", price: 2800 },
        { duration: "4-6 dób", price: 2400 },
        { duration: "7-13 dób", price: 1900 },
        { duration: "14-29 dób", price: 1400 },
        { duration: "Miesiąc", price: 29000 },
      ],
      mileage: [
        { duration: "do 6 dni", limit: "150 km / doba" },
        { duration: "od 7 do 13 dni", limit: "125 km / doba" },
        { duration: "od 14 do 29 dni", limit: "100 km / doba" },
        { duration: "od 30 dni", limit: "65 km / doba" },
      ]
    }
  },

  {
    id: 6, // Zakładam, że to kolejny samochód, więc ID powinno być unikalne
    make: "Mercedes-AMG",
    model: "G63 Brown",
    // year: undefined, // Rok produkcji nie został podany
    imageUrl: "/images/MercedesG63Brown/Mercedes-G63-Brown-sylwetka.jpg", // Główne zdjęcie - widok z boku (może wymagać zmiany)
    logoUrl: "/images/MercedesG63Brown/mercedes-amg.svg", // Logo marki
    specHighlights: {
      power: "585 KM",
      acceleration: "4,5 s",
      gearbox: "Automatyczna AMG SPEEDSHIFT TCT 9G",
      drive: "4x4",
      engineType: "4.0L V8 Biturbo",
      maxSpeed: "220 km/h",
    },
    description: `Historia Mercedesa klasy G sięga 1969 roku. Ideą powstania G klasy było połączenie terenowych zdolności z odpowiednim poziomem komfortu. Obecnie to SUV klasy wyższej, który stał się luksusowy, bardzo mocny i jedyny w swoim rodzaju. \n\nNasz egzemplarz to najmocniejsza wersja G63 z 4-litrowym silnikiem V8 Biturbo o mocy 585 KM. Ten 2.6-tonowy kolos rozpędza się do 100 km/h w zaledwie 4.5 sekundy. Najnowsza generacja W483 wyróżnia się rewelacyjnymi osiągami i poprawionym prowadzeniem oraz nowym poziomem luksusu i wykończenia wnętrza, szczególnie z “Pakietem wnętrza G manufaktur Plus” i “Pakietem Premium Plus”.\n\nNasz egzemplarz w brązowym lakierze z pewnością przyciąga uwagę. Jazda nim to wyjątkowe doświadczenie, które ciężko porównać do jakiegokolwiek innego auta!`,
    technicalData: {
      power: "585 KM",
      torque: "brak danych", // Moment obrotowy nie został podany wprost w nowym opisie
      acceleration: "4,5 s",
      gearbox: "Automatyczna AMG SPEEDSHIFT TCT 9G",
      drive: "4x4",
      engineType: "4.0L V8 Biturbo",
      maxSpeed: "220 km/h",
    },
    equipment: [
      "Aktywny system utrzymywania pasa ruchu",
      "Asystent martwego pola",
      "System nagłośnieniowy Burmester 3D",
      "Elektrycznie sterowane okno dachowe",
      "Kamera 360 stopni",
      "Pakiet night",
      "Pakiet wnętrza G manufaktur Plus (podsufitka designo, deska rozdzielcza obszyta skórą)",
      "Pakiet komfortowych siedzeń plus",
      "Adaptacyjny tempomat Distronic",
      "Oświetlenie ambiente (64 kolory)",
    ],
    galleryImages: [
      "/images/MercedesG63Brown/Mercedes-G63-Brown-przod.jpg", // Przykładowe zdjęcia - nazwy folderów i plików mogą wymagać korekty
      "/images/MercedesG63Brown/Mercedes-G63-Brown-sylwetka.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-bok.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-tyl.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-linia.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-wnetrze.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-deska-rozdzielcza.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-felga.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-lampa-przod.jpg",
      "/images/MercedesG63Brown/Mercedes-G63-Brown-znaczek-1.jpg",
      // Możesz dodać więcej linków do zdjęć, jeśli posiadasz
    ],
    pricing: {
      deposit: 30000,
      tiers: [
        { duration: "1 doba", price: 3200 },
        { duration: "2-3 doby", price: 2800 },
        { duration: "4-6 dób", price: 2400 },
        { duration: "7-13 dób", price: 1900 },
        { duration: "14-29 dób", price: 1400 },
        { duration: "Miesiąc", price: 29000 },
      ],
      mileage: [
        { duration: "do 6 dni", limit: "150 km / doba" },
        { duration: "od 7 do 13 dni", limit: "125 km / doba" },
        { duration: "od 14 do 29 dni", limit: "100 km / doba" },
        { duration: "od 30 dni", limit: "65 km / doba" },
      ],
      additionalMileageCost: 9, // Cena brutto
      relocationFees: {
        upTo7Days: 500, // Cena netto
        over7Days: 0,
      },
    },
  },
  {
    id: 7, // Zakładam, że to kolejny samochód, więc ID powinno być unikalne
    make: "Mercedes-AMG",
    model: "G63 Bordowy",
    // year: undefined, // Rok produkcji nie został podany
    imageUrl: "/images/MercedesG63Red/Mercedes-G63-Red-sylwetka.jpg", // Główne zdjęcie - widok z boku (może wymagać zmiany na bordowy)
    logoUrl: "/images/MercedesG63Red/mercedes-amg.svg", // Logo marki
    specHighlights: {
      power: "585 KM",
      acceleration: "4,5 s",
      gearbox: "Automatyczna AMG SPEEDSHIFT TCT 9G",
      drive: "4x4",
      engineType: "4.0L V8 Biturbo",
      maxSpeed: "220 km/h",
    },
    description: `Historia Mercedesa klasy G sięga 1969 roku. Ideą powstania G klasy było połączenie terenowych zdolności z odpowiednim poziomem komfortu. Obecnie to SUV klasy wyższej, który stał się luksusowy, bardzo mocny i jedyny w swoim rodzaju. \n\nNasz egzemplarz to najmocniejsza wersja G63 z 4-litrowym silnikiem V8 Biturbo o mocy 585 KM. Ten 2.6-tonowy kolos rozpędza się do 100 km/h w zaledwie 4.5 sekundy. Najnowsza generacja W483 wyróżnia się rewelacyjnymi osiągami i poprawionym prowadzeniem oraz nowym poziomem luksusu i wykończenia wnętrza, szczególnie z “Pakietem wnętrza G manufaktur Plus” i “Pakietem Premium Plus”.\n\nNasz egzemplarz w bordowym lakierze z pewnością przyciąga uwagę. Jazda nim to wyjątkowe doświadczenie, które ciężko porównać do jakiegokolwiek innego auta!`,
    technicalData: {
      power: "585 KM",
      torque: "brak danych", // Moment obrotowy nie został podany wprost w nowym opisie
      acceleration: "4,5 s",
      gearbox: "Automatyczna AMG SPEEDSHIFT TCT 9G",
      drive: "4x4",
      engineType: "4.0L V8 Biturbo",
      maxSpeed: "220 km/h",
    },
    equipment: [
      "Aktywny system utrzymywania pasa ruchu",
      "Asystent martwego pola",
      "System nagłośnieniowy Burmester 3D",
      "Elektrycznie sterowane okno dachowe",
      "Kamera 360 stopni",
      "Pakiet night",
      "Pakiet wnętrza G manufaktur Plus (podsufitka designo, deska rozdzielcza obszyta skórą)",
      "Pakiet komfortowych siedzeń plus",
      "Adaptacyjny tempomat Distronic",
      "Oświetlenie ambiente (64 kolory)",
    ],
    galleryImages: [
      "/images/MercedesG63Red/Mercedes-G63-Red-przod.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-sylwetka.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-bok.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-tyl.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-linia.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-wnetrze.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-deska-rozdzielcza.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-felga.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-lampa-przod.jpg",
      "/images/MercedesG63Red/Mercedes-G63-Red-znaczek-1.jpg",
    ],
    pricing: {
      deposit: 30000,
      tiers: [
        { duration: "1 doba", price: 3200 },
        { duration: "2-3 doby", price: 2800 },
        { duration: "4-6 dób", price: 2400 },
        { duration: "7-13 dób", price: 1900 },
        { duration: "14-29 dób", price: 1400 },
        { duration: "Miesiąc", price: 29000 },
      ],
      mileage: [
        { duration: "do 6 dni", limit: "150 km / doba" },
        { duration: "od 7 do 13 dni", limit: "125 km / doba" },
        { duration: "od 14 do 29 dni", limit: "100 km / doba" },
        { duration: "od 30 dni", limit: "65 km / doba" },
      ],
      additionalMileageCost: 9, // Cena brutto
      relocationFees: {
        upTo7Days: 500, // Cena netto
        over7Days: 0,
      },
    },
  },

  {
    id: 8, // Zakładam, że to kolejny samochód, więc ID powinno być unikalne
    make: "Mercedes-AMG",
    model: "GT 63 SE",
    // year: undefined, // Rok produkcji nie został podany
    imageUrl: "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-sylwetka.jpg", // Główne zdjęcie - może wymagać doprecyzowania
    logoUrl: "/images/MercedesAMG_GT63SE/mercedes-amg.svg", // Logo marki
    specHighlights: {
      power: "843 KM",
      acceleration: "2,9 s",
      gearbox: "Automatyczna",
      drive: "4x4 4Matic",
      engineType: "4.0L V8 BiTurbo Hybryda",
      maxSpeed: "316 km/h",
    },
    description: `Mercedes-AMG GT to perła w koronie samochodów AMG. Model GT 63 SE to supersamochód oferujący niesamowite osiągi w sportowym nadwoziu. Wykorzystuje hybrydowy napęd inspirowany Formułą 1, generując moc 843 KM i 900 Nm momentu obrotowego. Przyspieszenie do 100 km/h zajmuje zaledwie 2,9 s, a prędkość maksymalna to 316 km/h. Dodatkowo, sportowy układ wydechowy AMG Performance zapewnia rasowe brzmienie. Ten 5-drzwiowy supersamochód łączy osiągi z funkcjonalnością, oferując komfortową podróż dla czterech pasażerów.`,
    technicalData: {
      power: "843 KM",
      torque: "900 Nm", // Dodano moment obrotowy na podstawie opisu
      acceleration: "2,9 s",
      gearbox: "Automatyczna",
      drive: "4x4 4Matic",
      engineType: "4.0L V8 BiTurbo Hybryda",
      maxSpeed: "316 km/h",
    },
    equipment: [
      "Android Auto",
      "Apple CarPlay",
      "Bezprzewodowe ładowanie telefonu (przód i tył)",
      "Elektrycznie otwierana klapa bagażnika z dostępem bezdotykowym",
      "Fotele elektrycznie sterowane z pamięcią ustawień",
      "Fotele wentylowane",
      "Fotele podgrzewane",
      "Czujniki parkowania / kamera cofania 360 stopni z widokiem otoczenia",
      "Komfortowe domykanie drzwi",
      "Oświetlenie wnętrza Ambiente",
      "Pakiet AMG Dynamic Plus",
      "Skrętna tylna oś",
      "System nagłośnieniowy Burmester Surround",
      "Szyby przyciemniane",
      "Wyświetlacz Head-Up",
      "Zawieszenie AMG Ride Control",
    ],
    galleryImages: [
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-przod.jpg", // Przykładowe zdjęcia - nazwy folderów i plików mogą wymagać korekty
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-sylwetka.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-bok.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-tyl.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-linia.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-wnetrze.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-deska-rozdzielcza.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-fotele.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-lampa.jpg",
      "/images/MercedesAMG_GT63SE/Mercedes-AMG-GT-63-SE-felga.jpg",
      // Możesz dodać więcej linków do zdjęć, jeśli posiadasz
    ],
    pricing: {
      deposit: 10000,
      tiers: [
        { duration: "1 doba", price: 2800 },
        { duration: "2-3 doby", price: 2500 },
        { duration: "4-6 dób", price: 2350 },
        { duration: "7-13 dób", price: 1950 },
        { duration: "14-29 dób", price: 1400 },
        { duration: "Miesiąc", price: 28000 },
      ],
      mileage: [
        { duration: "do 7 dni", limit: "250 km / doba" },
        { duration: "od 7 dni do 30 dni", limit: "150 km / doba" },
        { duration: "od 30 dni", limit: "100 km / doba" },
      ],
      additionalMileageCost: 6.50, // Cena brutto
      relocationFees: {
        upTo7Days: 500, // Cena netto
        over7Days: 0,
      },
    },
  },

  ];
  
  // Eksportujemy tablicę, aby można ją było importować w innych komponentach
  export default CARS_DATA;