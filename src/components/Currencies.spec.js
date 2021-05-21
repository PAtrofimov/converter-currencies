import React from 'react';
import { render, fireEvent, waitFor, getAllByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Currencies, { LettersToolbar, CurrenciesTable, BaseCurrencyInput } from './Currencies';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';

const wrapper = (component) => {
    return <Provider store={configureStore()}>{component}</Provider>;
};

test('component LettersToolbar: find text U', () => {
    const firstLetters = ['', 'U'];
    const handleLetterClick = jest.fn();
    const { getByRole, getByText } = render(
        wrapper(<LettersToolbar firstLetters={firstLetters} handleLetterClick={handleLetterClick} />)
    );

    fireEvent.click(
        getByRole('button', {
            name: /u/i,
        })
    );

    expect(handleLetterClick).toHaveBeenCalled();

    getByText('U');
});


test('component CurrenciesTable: find text 1 USD', () => {
  const rates = [['USD', 10]];
  const { getByText } = render(
       wrapper(<CurrenciesTable rates={rates} />)
   );
   getByText('1 USD');
});

test('component BaseCurrencyInput: changed from USD to RUB', () => {
   let baseCur = 'USD';
   const rates = {RUB: 10, USD: 1};
   const handleChange = jest.fn();
   const { getByTestId, getAllByTestId } = render(
       wrapper(<BaseCurrencyInput  rates={rates} baseCur={baseCur} handleChange={handleChange} />)
   );
   userEvent.selectOptions(getByTestId('base-currency'), 'USD');
   expect(handleChange).toHaveBeenCalled();
   expect(getByTestId('currency-option-USD').selected).toBeTruthy();

});
