import React from 'react';
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen, waitFor } from './test-utils';
import Converter from './Converter';

it('Renders the loading connected app with initialState', async () => {
    render(<Converter />, {
        initialState: {
            currency: {
                loading: false,
                data: { base: 'RUB', rates: { RUB: 1, USD: 2 }, userBase: 'RUB', date: '' },
                error: '',
            },
        },
    });

    await waitFor(() => expect(screen.queryByText(/RUB/i)).toBeFalsy());

});

it('Renders the loading connected app with initialState', async () => {
   render(<Converter />, {
       initialState: {
           currency: {
               loading: true,
               data: { base: 'RUB', rates: { RUB: 1, USD: 2 }, userBase: 'RUB', date: '' },
               error: '',
           },
       },
   });
   await waitFor(() => expect(screen.queryByText(/RUB/i)).toBeTruthy());
});
