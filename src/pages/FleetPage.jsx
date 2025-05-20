import React, { useState, useMemo } from 'react';
import carsData from '../data/cars.js';
import CarCard from '../components/CarCard/CarCard';
import styles from './FleetPage.module.css';
import { FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDown, FaSortAmountUp, FaFilter, FaTimes } from 'react-icons/fa';

function FleetPage() {
  const [sortOption, setSortOption] = useState('default');
  const [filterBrands, setFilterBrands] = useState([]); // Stan dla wybranych marek
  const [showFilters, setShowFilters] = useState(false); // Stan dla widoczności filtrów na mobile

  const uniqueBrands = useMemo(() => {
    const brands = new Set(carsData.map(car => car.make));
    return Array.from(brands).sort(); // Posortuj alfabetycznie
  }, []);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;

    setFilterBrands(prevBrands =>
      isChecked ? [...prevBrands, brand] : prevBrands.filter(b => b !== brand)
    );
  };

  const clearFilters = () => {
    setFilterBrands([]);
  };

  const filteredAndSortedCars = useMemo(() => {
    let processedCars = [...carsData];

    if (filterBrands.length > 0) {
      processedCars = processedCars.filter(car => filterBrands.includes(car.make));
    }

    const getPrice = (car) => {  if(car.pricing.hasMultipleOptions){return car.pricing.options?.withDeposit?.tiers?.[0]?.price??0}else{return car.pricing?.tiers?.[0]?.price??0}};
    switch (sortOption) {
      case 'nameAsc': processedCars.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)); break;
      case 'nameDesc': processedCars.sort((a, b) => `${b.make} ${b.model}`.localeCompare(`${a.make} ${a.model}`)); break;
      case 'priceAsc': processedCars.sort((a, b) => getPrice(a) - getPrice(b)); break;
      case 'priceDesc': processedCars.sort((a, b) => getPrice(b) - getPrice(a)); break;
      default: processedCars.sort((a, b) => a.id - b.id); break;
    }
    return processedCars;
  }, [sortOption, filterBrands]);

  return (
    <div className={styles.fleetContainer}>
      <h2 className={styles.pageTitle}>Nasza Flota</h2>

      <div className={styles.controlsPanel}>
        <div className={styles.filterSection}>
          <h3 className={styles.controlTitle} onClick={() => setShowFilters(!showFilters)}>
            <FaFilter /> Filtruj Marki {showFilters ? '▲' : '▼'}
          </h3>
          <div className={`${styles.filterOptions} ${showFilters ? styles.show : ''}`}>
            {uniqueBrands.map(brand => (
              <div key={brand} className={styles.filterCheckbox}>
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  value={brand}
                  checked={filterBrands.includes(brand)}
                  onChange={handleBrandChange}
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ))}
            {filterBrands.length > 0 && (
              <button onClick={clearFilters} className={styles.clearFilterButton}>
                <FaTimes /> Wyczyść Filtry
              </button>
            )}
          </div>
        </div>

        <div className={styles.sortSection}>
           <h3 className={styles.controlTitle}><FaSortAmountDown /> Sortuj Według</h3>
           <div className={styles.sortButtons}>
              <button onClick={()=>setSortOption('default')} className={sortOption==='default'?styles.activeSort:''} title="Domyślnie">Domyślnie</button>
              <button onClick={()=>setSortOption('nameAsc')} className={sortOption==='nameAsc'?styles.activeSort:''} title="Nazwa A-Z"><FaSortAlphaDown/> Nazwa A-Z</button>
              <button onClick={()=>setSortOption('nameDesc')} className={sortOption==='nameDesc'?styles.activeSort:''} title="Nazwa Z-A"><FaSortAlphaUp/> Nazwa Z-A</button>
              <button onClick={()=>setSortOption('priceAsc')} className={sortOption==='priceAsc'?styles.activeSort:''} title="Cena Rosnąco"><FaSortAmountDown/> Cena Rosnąco</button>
              <button onClick={()=>setSortOption('priceDesc')} className={sortOption==='priceDesc'?styles.activeSort:''} title="Cena Malejąco"><FaSortAmountUp/> Cena Malejąco</button>
           </div>
        </div>
      </div>

      <div className={styles.fleetGrid}>
        {filteredAndSortedCars.length > 0 ? (
          filteredAndSortedCars.map(car => {
            let pricePerDay; if (car.pricing.hasMultipleOptions) { pricePerDay = car.pricing.options?.withDeposit?.tiers?.[0]?.price; } else { pricePerDay = car.pricing?.tiers?.[0]?.price; } if (pricePerDay === undefined) pricePerDay = 0;
            return ( <CarCard key={car.id} id={car.id} make={car.make} model={car.model} imageUrl={car.imageUrl} pricePerDay={pricePerDay} /> );
          })
        ) : (
          <p className={styles.noResults}>Brak samochodów spełniających wybrane kryteria.</p>
        )}
      </div>
    </div>
  );
}
export default FleetPage;