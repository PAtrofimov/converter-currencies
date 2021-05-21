import * as types from './converterTypes';
import * as actions from './converterActions';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

//https://redux.js.org/recipes/writing-tests#connected-components

describe('converter actions', () => {
    it('updateBaseCurrency should create UPDATE_BASE_CURRENCY action', () => {
        expect(actions.updateBaseCurrency('RUB')).toEqual({
            type: types.UPDATE_BASE_CURRENCY,
            payload: 'RUB',
        });
    });
});

describe('async actions', () => {
    afterEach(() => {
        mock.restore();
        //store.clearActions();
    });
    it('creates GET_CURRENCIES_SUCCESS when fetching currency courses has been done', () => {
        const result = {
            base: 'RUB',
            rates: { RUB: 10, USD: 1 },
            date: '2020-10-10',
            userBase: 'RUB',
        };

        const initialState = {
            loading: false,
            data: { base: '', rates: {}, userBase: '', date: '' },
            error: '',
        };
        mock.onGet(actions.currUrl).reply(200, result);

        const expectedActions = [
            { type: types.GET_CURRENCIES_REQUEST },
            {
                type: types.GET_CURRENCIES_SUCCESS,
                payload: { ...result },
            },
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.getCurrencies()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
