import { getConvertingParams } from './index';

const getResult = (amount = '0', from = '', to = '') => {
    return {
        amount,
        from,
        to,
    };
};

test('Should return object contains 3 keys (amount, from, to)', () => {
    const keys = Object.keys(getConvertingParams(''));
    expect(keys.length).toBe(3);
    expect(keys[0]).toBe('amount');
    expect(keys[1]).toBe('from');
    expect(keys[2]).toBe('to');
    expect(keys).toContain('amount');
});

test('None-string parameter throw Error', () => {
    expect(() => getConvertingParams()).toThrow();
    expect(() => getConvertingParams(0)).toThrow();
});

test.each([
    ['', getResult()],
    ['100RUB in USD', getResult('100', 'RUB', 'USD')],
    ['100RUBB in USD', getResult()],
    ['100RUB ing USD', getResult()],
    ['100RUB in USDD', getResult('100', 'RUB', 'USD')],
    ['100RUB in 10USD', getResult()],
])('eject from result %s', (s, expected) => {
    expect(getConvertingParams(s)).toEqual(expected);
});
