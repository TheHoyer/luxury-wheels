import allCarsData from '../data/cars'; // Poprawny import, jeśli cars.js jest w frontend/src/data/

export const calculateTotalPrice = (carId, startDateString, endDateString) => {
    const car = allCarsData.find(c => c.id === parseInt(carId));
    if (!car) {
        console.error(`Car with id ${carId} not found for price calculation.`);
        return { error: 'Nie znaleziono samochodu.', price: 0, days: 0, perDayRate: 0 };
    }

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate >= endDate) {
        console.error('Invalid dates for price calculation:', startDateString, endDateString);
        return { error: 'Nieprawidłowe daty.', price: 0, days: 0, perDayRate: 0 };
    }

    const timeDiff = endDate.getTime() - startDate.getTime();
    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (days <= 0) {
        days = 1; // Zakładamy minimum 1 dzień, jeśli daty są bardzo blisko
    }

    let pricePerDayCalculation = 0;
    let finalPrice = 0;
    const pricingInfo = car.pricing;

    const getTierPrice = (tiers, numDays) => {
        for (const tier of tiers) {
            if (tier.duration.includes('-')) {
                const parts = tier.duration.replace(/\s*(doby|dób)\s*/g, '').split('-');
                const minDays = parseInt(parts[0]);
                const maxDays = parseInt(parts[1]);
                if (numDays >= minDays && numDays <= maxDays) {
                    return tier.price;
                }
            } else if (tier.duration.startsWith('1 doba') || tier.duration.startsWith('1 dzień')) {
                if (numDays === 1) return tier.price;
            } else if (tier.duration === 'Miesiąc' && numDays >= 28 && numDays <= 31 && tier.price) {
                // Zwracamy cenę miesięczną jako całość, nie cenę za dzień
                return { monthlyTotal: tier.price };
            }
        }
        // Jeśli żaden przedział nie pasuje, bierzemy cenę za 1 dobę lub pierwszy dostępny tier
        return tiers[0]?.price || 0;
    };

    if (pricingInfo.hasMultipleOptions && pricingInfo.options?.withDeposit?.tiers) {
        const tierResult = getTierPrice(pricingInfo.options.withDeposit.tiers, days);
        if (typeof tierResult === 'object' && tierResult.monthlyTotal) {
            finalPrice = tierResult.monthlyTotal;
            pricePerDayCalculation = parseFloat((finalPrice / days).toFixed(2));
        } else {
            pricePerDayCalculation = tierResult;
            finalPrice = pricePerDayCalculation * days;
        }
    } else if (pricingInfo.tiers) {
        const tierResult = getTierPrice(pricingInfo.tiers, days);
        if (typeof tierResult === 'object' && tierResult.monthlyTotal) {
            finalPrice = tierResult.monthlyTotal;
            pricePerDayCalculation = parseFloat((finalPrice / days).toFixed(2));
        } else {
            pricePerDayCalculation = tierResult;
            finalPrice = pricePerDayCalculation * days;
        }
    } else if (pricingInfo.monthlyPrice && days >= 28 && days <= 31) {
        finalPrice = pricingInfo.monthlyPrice;
        pricePerDayCalculation = parseFloat((finalPrice / days).toFixed(2));
    }


    if (finalPrice <= 0 && pricePerDayCalculation <= 0) {
        console.error('Could not determine price for car:', car.id, 'and days:', days);
        // Próba wzięcia pierwszej ceny z pierwszego tieru jako ostateczność
        let fallbackPricePerDay = 0;
        if (pricingInfo.hasMultipleOptions && pricingInfo.options?.withDeposit?.tiers?.[0]?.price) {
            fallbackPricePerDay = pricingInfo.options.withDeposit.tiers[0].price;
        } else if (pricingInfo.tiers?.[0]?.price) {
            fallbackPricePerDay = pricingInfo.tiers[0].price;
        }
        if (fallbackPricePerDay > 0) {
            pricePerDayCalculation = fallbackPricePerDay;
            finalPrice = pricePerDayCalculation * days;
        } else {
            return { error: 'Nie udało się obliczyć ceny.', price: 0, days: days, perDayRate: 0 };
        }
    }

    return { price: finalPrice, days: days, perDayRate: pricePerDayCalculation };
};