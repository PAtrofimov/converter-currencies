import * as types from './converterTypes';
import converter from './converterReducer';

//https://redux.js.org/recipes/writing-tests#connected-components

const getState = ({ data = {}, ...rest }) => {
    return {
        loading: false,
        data: { base: '', rates: {}, userBase: '', date: '', ...data },
        error: '',
        ...rest,
    };
};

describe('converter reducer', () => {
    it('should handle initial state', () => {
        expect(converter(undefined, {})).toEqual({
            loading: false,
            data: { base: '', rates: {}, userBase: '', date: '' },
            error: '',
        });
    });
    it('should handle UPDATE_BASE_CURRENCY', () => {
        expect(
            converter(getState({ data: { userBase: 'RUB' } }), { type: types.UPDATE_BASE_CURRENCY, payload: 'USD' })
        ).toEqual({
            loading: false,
            data: { base: '', rates: {}, userBase: 'USD', date: '' },
            error: '',
        });
    });
    it('should handle GET_CURRENCIES_REQUEST', () => {
        expect(converter(getState({}), { type: types.GET_CURRENCIES_REQUEST })).toEqual({
            loading: true,
            data: { base: '', rates: {}, userBase: '', date: '' },
            error: '',
        });
    });
});
