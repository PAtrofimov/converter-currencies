import { createSelector } from 'reselect';
import { NUMBER_ON_PAGE } from '../utils/constants';

const ratesSelector = (state) => state.data.rates;
const userBaseSelector = (state) => state.data.userBase;
const baseSelector = (state) => state.data.base;

const convertedRatesSelector = createSelector(
    ratesSelector,
    userBaseSelector,
    baseSelector,

    (rates, userBase, base) => {
        let courseUserCur = 1;
        rates = Object.entries(rates);

        if (userBase !== base) {
            const [, value] = rates.find(([key]) => key === userBase);
            courseUserCur = value;
        }

        return rates.map(([key, value]) => [key, Math.round(1e10 * (courseUserCur / value)) / 1e10]);
    }
);

export const firstLettersSelector = createSelector(ratesSelector, (rates) =>
    ['', ...Array.from(new Set(Object.entries(rates).map(([key, value]) => key.charAt(0))))].sort()
);

export const allTypesRatesSelector = createSelector(
    convertedRatesSelector,
    firstLettersSelector,
    (rates, firstLetters) => {
        const allRates = firstLetters.reduce((acc, letter) => {
            const newRates = rates.filter(([key]) => !letter || key.charAt(0) === letter);
            const numberPages = Math.ceil(newRates.length / NUMBER_ON_PAGE);
            const result = [];

            for (let currentPage = 1; currentPage <= numberPages; currentPage++) {
                const filtered = newRates.filter(
                    (el, index) => index >= (currentPage - 1) * NUMBER_ON_PAGE && index < NUMBER_ON_PAGE * currentPage
                );

                result.push(filtered);
            }

            return { ...acc, [letter]: { rates: [...result], numberPages } };
        }, {});

        return allRates;
    }
);
