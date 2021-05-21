import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ConvertForm from './ConvertForm';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';

const wrapper = (component) => {
    return <Provider store={configureStore()}>{component}</Provider>;
};

const getState = (props) => {
    return {
        rates: { ...props },
    };
};

test('component ConvertForm: convertation return value', async () => {
    const data = getState({ UAH: '100', RUB: '1' });
    const { getByRole, getByTestId } = render(wrapper(<ConvertForm data={data} />));

    fireEvent.change(getByTestId('convert-input'), { target: { value: '150 UAH in RUB' } });
    fireEvent.click(
        getByRole('button', {
            name: /convert/i,
        })
    );
    await waitFor(() => expect(getByTestId('convert-result').value).toBe('1.5'));
});

test('component ConvertForm: convertation return 0', async () => {
   const data = getState({ UAH: '100', RUB: '1' });

   const { getByRole, getByTestId } = render(wrapper(<ConvertForm data={data}/>));

    fireEvent.change(getByTestId('convert-input'), { target: { value: '150 UAHD in RUB' } });
    fireEvent.click(
        getByRole('button', {
            name: /convert/i,
        })
    );
    await waitFor(() => expect(getByTestId('convert-result').value).toBe('0'));
});
