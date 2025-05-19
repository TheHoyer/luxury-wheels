import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HowItWorksPage.module.css';
import homePageStyles from './HomePage.module.css';
import { FaKey, FaCar, FaCalendarCheck, FaRoad, FaIdCard, FaFileContract, FaShieldAlt, FaGasPump, FaUndo, FaPlusCircle } from 'react-icons/fa';

function HowItWorksPage() {
  return (
    <div className={styles.howItWorksPage}>
      <section className={`${homePageStyles.howItWorksSection} ${homePageStyles.fullWidthSection} ${styles.firstSectionPadding}`}>
         <div className="container">
            <h2 className={styles.sectionTitle}>Wynajem w 4 Prostych Krokach</h2>
            <div className={homePageStyles.howItWorksSteps}>
              <div className={homePageStyles.step}><FaCar size={40} className={homePageStyles.stepIcon}/><h3>1. Wybierz Auto</h3><p>Przejrzyj naszą starannie wyselekcjonowaną flotę luksusowych i sportowych samochodów. Porównaj modele i wybierz ten, który najlepiej spełnia Twoje oczekiwania.</p></div>
              <div className={homePageStyles.step}><FaCalendarCheck size={40} className={homePageStyles.stepIcon}/><h3>2. Zarezerwuj Termin</h3><p>Skontaktuj się z nami telefonicznie, mailowo lub przez formularz kontaktowy, aby sprawdzić dostępność wybranego auta w interesującym Cię terminie.</p></div>
              <div className={homePageStyles.step}><FaKey size={40} className={homePageStyles.stepIcon}/><h3>3. Potwierdź i Odbierz</h3><p>Po ustaleniu szczegółów i ewentualnej wpłacie zaliczki, przygotujemy samochód i umowę. Odbierz kluczyki w naszej siedzibie lub umów się na dostawę.</p></div>
              <div className={homePageStyles.step}><FaRoad size={40} className={homePageStyles.stepIcon}/><h3>4. Ciesz się Jazdą!</h3><p>Ruszaj w drogę, poczuj moc i luksus. Doświadcz niezapomnianych chwil za kierownicą wymarzonego samochodu z Luxury Wheels.</p></div>
            </div>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <h2 className={`${styles.sectionTitle} ${styles.detailsTitle}`}>Szczegóły Procesu Wynajmu</h2>
        <div className={`${styles.detailBlock} ${styles.altBackground}`}>
          <div className="container">
             <FaIdCard className={styles.detailIcon}/>
             <div className={styles.detailContent}><h3>Wymagania i Niezbędne Dokumenty</h3><p>Aby zapewnić bezpieczeństwo i zgodność z przepisami, wymagamy od naszych klientów spełnienia kilku warunków oraz przedstawienia odpowiednich dokumentów:</p><ul><li><strong>Ważne Prawo Jazdy:</strong> Kategoria B jest podstawą. Wymagamy, aby kierowca posiadał prawo jazdy od minimum 3 lat. Dla niektórych modeli o wysokiej mocy, ten okres może być dłuższy – zapytaj o szczegóły dla konkretnego auta.</li><li><strong>Minimalny Wiek Kierowcy:</strong> Standardowo wynosi 25 lat. Jednakże, dla wybranych supersamochodów, próg wiekowy może być podniesiony do 28 lub 30 lat.</li><li><strong>Drugi Dokument Tożsamości:</strong> Prosimy o przedstawienie ważnego dowodu osobistego lub paszportu w celu weryfikacji tożsamości.</li><li><strong>Karta Kredytowa/Płatnicza:</strong> Niezbędna do autoryzacji (preautoryzacji) kaucji zwrotnej za pojazd. Akceptujemy główne typy kart. W indywidualnych przypadkach możliwa jest kaucja gotówkowa lub przelewem (wymaga wcześniejszego ustalenia).</li></ul><p><em>Pamiętaj, że niespełnienie powyższych warunków może uniemożliwić wynajem pojazdu.</em></p></div>
          </div>
        </div>
        <div className={styles.detailBlock}>
          <div className="container">
             <FaFileContract className={styles.detailIcon}/>
             <div className={styles.detailContent}><h3>Rezerwacja, Płatności i Umowa Najmu</h3><p>Staramy się, aby proces rezerwacji i formalności były jak najprostsze i najbardziej transparentne:</p><ol><li><strong>Zapytanie Ofertowe:</strong> Po wybraniu modelu i terminu, skontaktuj się z nami. Najszybciej odpowiemy na zapytania telefoniczne lub mailowe. Możesz również skorzystać z formularza na stronie kontaktowej.</li><li><strong>Potwierdzenie Dostępności i Oferta:</strong> Niezwłocznie sprawdzimy, czy wybrany samochód jest dostępny w podanym terminie. Przedstawimy Ci szczegółową ofertę wynajmu, obejmującą cenę, limit kilometrów, wysokość kaucji oraz Ogólne Warunki Wynajmu (OWW).</li><li><strong>Potwierdzenie Rezerwacji:</strong> Aby zagwarantować rezerwację, zazwyczaj wymagamy wpłaty zaliczki (szczegóły ustalane indywidualnie). Po jej otrzymaniu, termin jest dla Ciebie zarezerwowany.</li><li><strong>Umowa Najmu:</strong> Przygotujemy kompletną umowę najmu. Podpisanie umowy oraz protokołu zdawczo-odbiorczego następuje w momencie odbioru samochodu. Prosimy o dokładne zapoznanie się z jej treścią.</li></ol></div>
          </div>
        </div>
        <div className={`${styles.detailBlock} ${styles.altBackground}`}>
           <div className="container">
             <FaShieldAlt className={styles.detailIcon}/>
             <div className={styles.detailContent}><h3>Kaucja Zwrotna i Pełne Ubezpieczenie</h3><p>Twoje bezpieczeństwo i spokój ducha są dla nas priorytetem:</p><ul><li><strong>Kaucja Zwrotna:</strong> Jest to standardowa procedura zabezpieczająca ewentualne szkody lub naruszenia warunków umowy. Kaucja jest w pełni zwracana po bezszkodowym zwrocie pojazdu w nienaruszonym stanie. Jej wysokość jest zróżnicowana w zależności od wartości i klasy wynajmowanego samochodu (szczegóły w cenniku).</li><li><strong>Pełen Pakiet Ubezpieczeń:</strong> Wszystkie samochody w naszej flocie posiadają kompleksowe ubezpieczenie OC (Odpowiedzialność Cywilna), AC (Autocasco), NNW (Następstwa Nieszczęśliwych Wypadków) oraz Assistance na terenie Polski i Europy.</li><li><strong>Udział Własny w Szkody (Wkład Własny):</strong> Prosimy o zwrócenie uwagi na zapisy w umowie dotyczące ewentualnego udziału własnego w przypadku wystąpienia szkody z winy najemcy (AC). Szczegółowe informacje znajdują się w Ogólnych Warunkach Wynajmu.</li></ul></div>
           </div>
        </div>
        <div className={styles.detailBlock}>
           <div className="container">
             <FaGasPump className={styles.detailIcon}/>
             <div className={styles.detailContent}><h3>Zasady Dotyczące Paliwa i Limitu Kilometrów</h3><p>Aby wynajem przebiegał sprawnie, prosimy o przestrzeganie następujących zasad:</p><ul><li><strong>Polityka Paliwowa "Pełny do Pełnego":</strong> Samochód jest wydawany z pełnym zbiornikiem paliwa (benzyna Pb98 lub Pb95, zgodnie ze specyfikacją modelu) i oczekujemy jego zwrotu również z pełnym bakiem. Ewentualne dotankowanie przez naszą firmę wiąże się z dodatkową opłatą serwisową.</li><li><strong>Limit Kilometrów:</strong> Każdy wynajem obejmuje określony limit kilometrów wliczony w cenę (np. 100 km, 150 km na dobę). Dokładny limit jest podany w cenniku dla każdego modelu i może różnić się w zależności od długości najmu.</li><li><strong>Przekroczenie Limitu:</strong> Każdy kilometr przejechany ponad ustalony limit podlega dodatkowej opłacie, której stawka również znajduje się w cenniku danego pojazdu.</li></ul></div>
           </div>
        </div>
        <div className={`${styles.detailBlock} ${styles.altBackground}`}>
          <div className="container">
             <FaUndo className={styles.detailIcon}/>
             <div className={styles.detailContent}><h3>Procedura Odbioru i Zwrotu Samochodu</h3><p>Staramy się, aby moment odbioru i zwrotu był dla Ciebie jak najwygodniejszy:</p><ul><li><strong>Miejsce i Godziny:</strong> Standardowo samochody odbierane i zwracane są w naszej głównej siedzibie w godzinach pracy biura. Prosimy o wcześniejsze ustalenie dokładnej godziny.</li><li><strong>Dostawa "Door-to-Door" (Opcjonalnie):</strong> Oferujemy możliwość podstawienia i odbioru samochodu pod dowolny wskazany adres na terenie miasta lub regionu (usługa wyceniana indywidualnie, zależnie od odległości).</li><li><strong>Protokół Zdawczo-Odbiorczy:</strong> Przy odbiorze auta wspólnie dokonujemy oględzin pojazdu, dokumentując jego stan (ewentualne istniejące uszkodzenia, stan licznika, poziom paliwa) na protokole zdawczo-odbiorczym, który jest integralną częścią umowy. Analogiczna procedura ma miejsce przy zwrocie pojazdu.</li></ul></div>
          </div>
        </div>
        <div className={styles.detailBlock}>
          <div className="container">
             <FaPlusCircle className={styles.detailIcon}/>
             <div className={styles.detailContent}><h3>Dodatkowe Usługi, Opcje i Pytania</h3><p>Jesteśmy elastyczni i otwarci na Twoje indywidualne potrzeby:</p><ul><li><strong>Wynajem z Kierowcą:</strong> Potrzebujesz transportu na specjalne wydarzenie bez konieczności prowadzenia? Oferujemy wynajem wybranych modeli wraz z naszym doświadczonym i dyskretnym kierowcą.</li><li><strong>Okazje Specjalne:</strong> Planujesz ślub, wieczór kawalerski/panieński, sesję zdjęciową lub event firmowy? Skontaktuj się z nami, a przygotujemy dedykowaną ofertę dopasowaną do charakteru wydarzenia.</li><li><strong>Niestandardowe Warunki:</strong> Potrzebujesz auta na dłużej niż miesiąc? Interesuje Cię większy limit kilometrów? Jesteśmy otwarci na negocjacje i ustalenie indywidualnych warunków najmu.</li><li><strong>Masz Pytania?</strong> Jeśli cokolwiek jest niejasne lub potrzebujesz dodatkowych informacji, nie wahaj się z nami skontaktować. Chętnie odpowiemy na wszystkie pytania.</li></ul></div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
         <div className="container"><h2>Gotowy na Niezapomniane Wrażenia?</h2><p>Przejrzyj naszą flotę i wybierz auto, które przyspieszy bicie Twojego serca!</p><Link to="/fleet" className={homePageStyles.heroCtaButton}>Sprawdź Samochody</Link></div>
      </section>
    </div>
  );
}
export default HowItWorksPage;