import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import CarCard from '../components/CarCard/CarCard';
import carsData from '../data/cars.js';
import { FaKey, FaCar, FaCalendarCheck, FaRoad, FaStar, FaThumbsUp, FaShieldAlt, FaGem } from 'react-icons/fa';
import heroBackground from '../assets/images/hero-background.jpg';

function HomePage() {
  const featuredCars = carsData.slice(0, 2);

  return (
    <div>
      <section className={styles.heroSection} style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Poczuj Prędkość, Doświadcz Luksusu</h1>
          <h2>Wynajmij Wymarzone Auto Sportowe</h2>
          <p>Odkryj naszą ekskluzywną flotę i spełnij swoje motoryzacyjne marzenia z Luxury Wheels.</p>
          <Link to="/fleet" className={styles.heroCtaButton}>Zobacz Naszą Flotę</Link>
        </div>
      </section>

      <section className={`${styles.aboutSection} ${styles.fullWidthSection}`}>
        <div className="container">
          <h2 className="section-title">Poznaj Luxury Wheels</h2>
          <div className={styles.aboutLayout}>
            <div className={styles.aboutContent}>
              <p>Luxury Wheels to nie tylko wypożyczalnia – to brama do świata motoryzacyjnych marzeń. Oferujemy starannie wyselekcjonowaną flotę najbardziej pożądanych samochodów sportowych i luksusowych.</p>
              <p>Naszą misją jest dostarczanie niezapomnianych wrażeń i najwyższej jakości obsługi, dbając o każdy detal Twojego wynajmu.</p>
            </div>
            <div className={styles.aboutIconContainer}>
              <FaGem size={80} className={styles.aboutIcon} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.featuredCarsSection} section`}>
        <h2 className="section-title">Nasze Perełki</h2>
        <div className={styles.featuredCarsGrid}>
          {featuredCars.map(car => { let pricePerDay; if (car.pricing.hasMultipleOptions) { pricePerDay = car.pricing.options?.withDeposit?.tiers?.[0]?.price; } else { pricePerDay = car.pricing?.tiers?.[0]?.price; } if (pricePerDay === undefined) pricePerDay = 0; return ( <CarCard key={car.id} id={car.id} make={car.make} model={car.model} imageUrl={car.imageUrl} pricePerDay={pricePerDay} /> ); })}
        </div>
        <div className={styles.viewAllButtonContainer}>
          <Link to="/fleet" className={styles.viewAllButton}>Zobacz Całą Flotę</Link>
        </div>
      </section>

      <section className={`${styles.whyUsSection} ${styles.fullWidthSection}`}>
        <div className="container">
          <h2 className="section-title">Dlaczego Warto Wybrać Luxury Wheels?</h2>
          <div className={styles.whyUsGrid}>
             <div className={styles.featureItem}> <FaStar size={40} className={styles.featureIcon} /><h3>Ekskluzywna Flota</h3><p>Oferujemy tylko najnowsze i najbardziej pożądane modele aut sportowych i luksusowych.</p> </div>
             <div className={styles.featureItem}> <FaThumbsUp size={40} className={styles.featureIcon} /><h3>Najwyższa Jakość Obsługi</h3><p>Gwarantujemy profesjonalne doradztwo, elastyczność i dyskrecję na każdym etapie.</p> </div>
             <div className={styles.featureItem}> <FaShieldAlt size={40} className={styles.featureIcon} /><h3>Bezpieczeństwo i Komfort</h3><p>Nasze auta są regularnie serwisowane i w pełni ubezpieczone dla Twojego spokoju.</p> </div>
          </div>
        </div>
      </section>

      <section className={`${styles.howItWorksSection} ${styles.fullWidthSection}`}>
         <div className="container">
            <h2 className="section-title">Wynajem w 4 Prostych Krokach</h2>
            <div className={styles.howItWorksSteps}>
              <div className={styles.step}> <FaCar size={40} className={styles.stepIcon} /><h3>1. Wybierz Auto</h3><p>Przejrzyj naszą starannie wyselekcjonowaną flotę luksusowych i sportowych samochodów. Porównaj modele i wybierz ten, który najlepiej spełnia Twoje oczekiwania.</p> </div>
              <div className={styles.step}> <FaCalendarCheck size={40} className={styles.stepIcon} /><h3>2. Zarezerwuj Termin</h3><p>Skontaktuj się z nami telefonicznie, mailowo lub przez formularz kontaktowy, aby sprawdzić dostępność wybranego auta w interesującym Cię terminie.</p> </div>
              <div className={styles.step}> <FaKey size={40} className={styles.stepIcon} /><h3>3. Potwierdź i Odbierz</h3><p>Po ustaleniu szczegółów i ewentualnej wpłacie zaliczki, przygotujemy samochód i umowę. Odbierz kluczyki w naszej siedzibie lub umów się na dostawę.</p> </div>
              <div className={styles.step}> <FaRoad size={40} className={styles.stepIcon} /><h3>4. Ciesz się Jazdą!</h3><p>Ruszaj w drogę, poczuj moc i luksus. Doświadcz niezapomnianych chwil za kierownicą wymarzonego samochodu z Luxury Wheels.</p> </div>
            </div>
            <div className={styles.viewAllButtonContainer}>
              <Link to="/how-it-works" className={styles.viewAllButton}>Dowiedz się więcej</Link>
            </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;