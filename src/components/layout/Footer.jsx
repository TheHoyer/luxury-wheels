import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.companyInfo}>
             <p className={styles.tagline}>Luxury Wheels - Twoje klucze do motoryzacyjnych marzeń.</p>
             <div className={styles.copyright}>
                © {currentYear} Wszelkie prawa zastrzeżone.
             </div>
          </div>


          <nav className={styles.footerNav}>
            <h4>Szybkie Linki</h4>
            <Link to="/fleet">Flota</Link>
            <Link to="/how-it-works">Jak to działa</Link>
            <Link to="/contact">Kontakt</Link>
          </nav>

          <div className={styles.footerSocial}>
             <h4>Znajdź nas</h4>
             <div className={styles.socialIcons}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <Link to="/contact" aria-label="Kontakt telefoniczny"><FaPhoneAlt /></Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;