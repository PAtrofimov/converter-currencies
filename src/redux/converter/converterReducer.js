import * as types from './converterTypes';

const initialState = {
    loading: false,
    data: { base: '', rates: {}, userBase: '', date: '' },
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CURRENCIES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.GET_CURRENCIES_SUCCESS: {
            const data = action.payload;
            return { ...state, loading: false, data, error: '' };
        }
        case types.GET_CURRENCIES_FAILURE:
            return { ...state, loading: false, data: {}, error: action.payload };

        case types.UPDATE_BASE_CURRENCY:
            return { ...state, loading: false, data: { ...state.data, userBase: action.payload}};

        default:
            return state;
    }
};

export default reducer;
