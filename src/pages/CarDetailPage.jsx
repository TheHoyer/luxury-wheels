import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import carsData from '../data/cars.js'; // Upewnij się, że ścieżka jest poprawna
import styles from './CarDetailPage.module.css';
import { FaCheckCircle, FaTachometerAlt, FaBolt, FaCogs, FaUsers, FaGasPump, FaArrowsAltH } from 'react-icons/fa'; // Ikony mogą być nadal używane gdzieś indziej
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Funkcja getSpecDetails - może być uproszczona, jeśli ikony nie są już potrzebne DLA SPECYFIKACJI
// ale zostawiam ją, bo może być używana gdzie indziej lub w przyszłości
const getSpecDetails = (key) => {
  const defaultDetails = { label: key?.charAt(0).toUpperCase() + key?.slice(1) || 'Brak Danych', icon: null };
  if (!key) return defaultDetails;
  switch (key.toLowerCase()) {
    case 'power': return { label: 'Moc', icon: FaBolt };
    case 'acceleration': return { label: '0-100 km/h', icon: FaTachometerAlt };
    case 'gearbox': return { label: 'Skrzynia', icon: FaCogs };
    case 'drive': return { label: 'Napęd', icon: FaArrowsAltH };
    case 'enginetype': return { label: 'Silnik', icon: FaGasPump };
    case 'maxspeed': return { label: 'V-max', icon: FaTachometerAlt };
    case 'seats': return { label: 'Miejsca', icon: FaUsers };
    default: return defaultDetails;
  }
};

function CarDetailPage() {
  const { carId } = useParams();
  const car = carsData.find(c => c.id === parseInt(carId));
  const mainSliderRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!car) {
    return (
        <div className={`${styles.detailContainer} ${styles.notFound}`}>
          <h2>Nie znaleziono samochodu</h2>
          <p>Przepraszamy, samochód o podanym identyfikatorze nie istnieje lub został usunięty.</p>
          <Link to="/fleet" className={styles.backButton}>Wróć do Floty</Link>
        </div>
    );
  }

  const mainSliderSettings = {
    dots: true,
    dotsClass: `slick-dots ${styles.customDots}`,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    adaptiveHeight: true,
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const renderPricingSection = (pricingData, title) => (
      <div className={styles.pricingOption}>
        {title && <h4>{title}</h4>}
        {pricingData.deposit > 0 && <p className={styles.depositInfo}><strong>Kaucja:</strong> {pricingData.deposit.toLocaleString('pl-PL')} zł</p>}
        <ul className={styles.pricingTiers}>
          {pricingData.tiers.map(tier => (
              <li key={tier.duration}>
                <span>{tier.duration}:</span>
                <strong>{tier.price.toLocaleString('pl-PL')} zł {tier.duration !== 'Miesiąc' && '/ doba'}</strong>
              </li>
          ))}
          {pricingData.monthlyPrice && (
              <li key="Miesiąc">
                <span>Miesiąc:</span>
                <strong>{pricingData.monthlyPrice.toLocaleString('pl-PL')} zł</strong>
              </li>
          )}
        </ul>
      </div>
  );

  const lightboxSlides = car.galleryImages.map(img => ({ src: img }));

  const desiredSpecKeys = ['power', 'acceleration', 'gearbox', 'drive', 'engineType', 'maxSpeed'];

  return (
      <div className={styles.carDetailPage}>
        <section className={styles.titleSection}>
          <div className="container">
            <h1 className={styles.carTitle}>{car.make} {car.model}</h1>
          </div>
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.mainSliderWrapper}>
            <Slider ref={mainSliderRef} {...mainSliderSettings}>
              {car.galleryImages.map((image, index) => (
                  <div key={index} className={styles.slideWrapper}>
                    <img src={image} alt={`${car.make} ${car.model} - Zdjęcie ${index + 1}`} className={styles.galleryImage} />
                  </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* NOWA, WYRÓŻNIONA SEKCJA SPECYFIKACJI */}
        <section className={styles.highlightedSpecsBlock}>
          <div className="container">
            <div className={styles.highlightedSpecsHeader}>
              <h2 className={styles.highlightedSpecsVehicleTitle}>
                Wynajem {car.make} {car.model}
              </h2>
              {car.brandLogoUrl && (
                  <img
                      src={process.env.PUBLIC_URL + car.brandLogoUrl}
                      alt={`${car.make} Logo`}
                      className={styles.highlightedSpecsBrandLogo}
                  />
              )}
            </div>
            <p className={styles.highlightedSpecsSubtitle}>Specyfikacja</p>
            <div className={styles.highlightedSpecsGrid}>
              {desiredSpecKeys.map((key) => {
                const value = car.specHighlights && car.specHighlights[key];
                if (!value) return null;

                const { label } = getSpecDetails(key);
                return (
                    <div key={key} className={styles.highlightedSpecItem}>
                      <span className={styles.highlightedSpecValue}>{value}</span>
                      <span className={styles.highlightedSpecLabel}>{label}</span>
                    </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* KONIEC NOWEJ, WYRÓŻNIONEJ SEKCJI SPECYFIKACJI */}

        {/* Stara sekcja specyfikacji została USUNIĘTA */}

        <section className={`${styles.descriptionEquipmentSection} ${styles.fullWidthSection}`}>
          <div className="container">
            <div className={styles.descriptionTextContainer}>
              <h2 className={styles.sectionTitle}>Opis Pojazdu</h2>
              <p className={styles.descriptionText}>{car.description}</p>
            </div>
            <div className={styles.equipmentSection}>
              <h3 className={styles.subSectionTitle}>Wyposażenie</h3>
              <ul className={styles.equipmentList}>
                {car.equipment.map((item, index) => (
                    <li key={index}>
                      <FaCheckCircle className={styles.equipmentIcon} /> {item}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.pricingGallerySection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Cennik Wynajmu</h2>
            <div className={styles.pricingWrapper}>
              {car.pricing.hasMultipleOptions ? (
                  <>
                    {renderPricingSection(car.pricing.options.withDeposit, car.pricing.options.withDeposit.optionLabel)}
                    {renderPricingSection(car.pricing.options.withoutDeposit, car.pricing.options.withoutDeposit.optionLabel)}
                  </>
              ) : (
                  renderPricingSection(car.pricing)
              )}
            </div>
            <div className={styles.mileageSection}>
              <h4 className={styles.subSectionTitle}>Przebieg Zawarty w Cenie:</h4>
              <ul className={styles.mileageList}>
                {car.pricing.mileage.map(limit => (
                    <li key={limit.duration}>{limit.duration}: <strong>{limit.limit}</strong></li>
                ))}
              </ul>
            </div>
            <p className={styles.vatInfo}>Podane ceny są cenami netto. Do każdej ceny należy doliczyć 23% VAT.</p>

            <div className={styles.thumbnailGallery}>
              <h3 className={styles.subSectionTitle}>Galeria Zdjęć</h3>
              <div className={styles.thumbnailGrid}>
                {car.galleryImages.map((image, index) => (
                    <div key={index} className={styles.thumbnailWrapper} onClick={() => openLightbox(index)}>
                      <img src={image} alt={`Miniatura ${index + 1}`} className={styles.thumbnailImage} />
                    </div>
                ))}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <Link to="/contact" className={styles.bookingButton}>Zapytaj o Rezerwację</Link>
              <Link to="/fleet" className={styles.backButton}>Wróć do Floty</Link>
            </div>
          </div>
        </section>

        <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={lightboxSlides}
            index={lightboxIndex}
        />
      </div>
  );
}

export default CarDetailPage;