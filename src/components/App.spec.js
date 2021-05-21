import React from 'react';
import { render } from '@testing-library/react';
import Header from './App';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';

const wrapper = (component) => {
    return <Provider store={configureStore()}>{component}</Provider>;
};

test('component Header', () => {
    const { getByText } = render(wrapper(<Header />));
    getByText('Convertor of currencies');
});
