import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logoImage from '../../assets/images/logo.png';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
  const closeMobileMenu = () => { setIsMobileMenuOpen(false); }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} onClick={closeMobileMenu}>
          <img src={logoImage} alt="Luxury Wheels Logo" className={styles.logoImage} />
        </Link>
        <nav className={styles.nav}>
           <ul><li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>Strona Główna</NavLink></li><li><NavLink to="/fleet" className={({ isActive }) => isActive ? styles.active : ""}>Flota</NavLink></li><li><NavLink to="/how-it-works" className={({ isActive }) => isActive ? styles.active : ""}>Jak to działa</NavLink></li><li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ""}>Kontakt</NavLink></li></ul>
        </nav>
        <div className={styles.actions}>
           <div className={styles.socialIcons}><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a><Link to="/contact" aria-label="Kontakt telefoniczny"><FaPhoneAlt /></Link></div><Link to="/contact" className={styles.ctaButton}>Zarezerwuj</Link>
        </div>
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
           <NavLink to="/" className={({ isActive }) => isActive ? styles.activeMobile : ""} onClick={closeMobileMenu}>Strona Główna</NavLink>
           <NavLink to="/fleet" className={({ isActive }) => isActive ? styles.activeMobile : ""} onClick={closeMobileMenu}>Flota</NavLink>
           <NavLink to="/how-it-works" className={({ isActive }) => isActive ? styles.activeMobile : ""} onClick={closeMobileMenu}>Jak to działa</NavLink>
           <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeMobile : ""} onClick={closeMobileMenu}>Kontakt</NavLink>
           <Link to="/contact" className={styles.mobileCtaButton} onClick={closeMobileMenu}>
            Zarezerwuj
           </Link>
           <div className={styles.mobileSocialIcons}>
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
             {/* 🔥 Dodana ikona telefonu */}
             <Link to="/contact" aria-label="Kontakt telefoniczny" onClick={closeMobileMenu}><FaPhoneAlt /></Link>
           </div>
        </div>
      )}
    </header>
  );
}
export default Header;