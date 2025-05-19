import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CarCard.module.css';

function CarCard({ id, make, model, imageUrl, pricePerDay }) {
  if (!id || !make || !model || !imageUrl || pricePerDay === undefined) {
    console.error("Brakujące dane dla CarCard:", { id, make, model, imageUrl, pricePerDay });
    return <div className={styles.cardError}>Brak danych karty</div>;
  }

  return (
    <div className={styles.card}>
      <Link to={`/fleet/${id}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={`${make} ${model}`} className={styles.image} loading="lazy" />
        </div>
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}><Link to={`/fleet/${id}`}>{make} {model}</Link></h3>
        <p className={styles.price}>od {pricePerDay.toLocaleString('pl-PL')} zł / doba</p>
        <Link to={`/fleet/${id}`} className={styles.detailsButton}>Zobacz Szczegóły</Link>
      </div>
    </div>
  );
}
export default CarCard;