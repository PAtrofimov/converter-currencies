import * as types from './converterTypes';
import axios from 'axios';

const site = 'http://data.fixer.io/api';
const accessKey = 'dafb064f846be9beaaca228080750363';
export const currUrl = `${site}/latest?access_key=${accessKey}`;
const convertUrl = `${site}/convert?access_key=${accessKey}`;

export function getCurrencies() {
    return (dispatch) => {
        dispatch(getCurrenciesRequest());
        let userBase = '';
        try {
            userBase = localStorage.getItem('userBase');
        } catch (error) {}

        return axios
            .get(currUrl)
            .then(({ data }) => {
                const result = {
                    base: data.base,
                    rates: data.rates,
                    date: data.date,
                    userBase: userBase ? userBase : data.base,
                };
                dispatch(getCurrenciesSuccess(result));
            })
            .catch((error) => {
                dispatch(getCurrenciesFailure(error.message));
            });
    };
}

export const getCurrenciesRequest = () => {
    return {
        type: types.GET_CURRENCIES_REQUEST,
    };
};

export const getCurrenciesSuccess = (data) => {
    return {
        type: types.GET_CURRENCIES_SUCCESS,
        payload: data,
    };
};

export const getCurrenciesFailure = (error) => {
    return {
        type: types.GET_CURRENCIES_FAILURE,
        payload: error,
    };
};

export const convertMoney = async ({ amount, from, to }, { rates }) => {
    // https://data.fixer.io/api/convert
    //  ? access_key = API_KEY
    //  & from = GBP
    //  & to = JPY
    //  & amount = 25
    const currencies = Object.keys(rates);
    let courseFrom = currencies.includes(from) ? rates[from] : 0;
    let courseTo = currencies.includes(to) ? rates[to] : 0;
    let value = courseFrom === 0 ? 0 : Math.round(1e10 * ((amount * courseTo) / courseFrom)) / 1e10;
    let error =
        courseFrom === 0
            ? "Initial currency doesn't exist. \n"
            : '' + (courseTo === 0 ? "Output currency doesn't exist." : '');

    return { value, error };
};

export const updateBaseCurrency = (currency) => {
    // https://data.fixer.io/api/latest
    // ? access_key = API_KEY
    // & base = USD
    return {
        type: types.UPDATE_BASE_CURRENCY,
        payload: currency,
    };
};

export const saveUserBaseCurrency = (currency) => {
    if (!currency) {
        return;
    }
    localStorage.setItem('userBase', currency);
    return updateBaseCurrency(currency);
};
