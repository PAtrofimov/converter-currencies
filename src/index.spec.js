import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Link, Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import configureStore, { history } from './redux/configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './components/App';
import NotFound from './components/NotFound';

const Index = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

const Wrapper = ({ children }) => (
    <Provider store={configureStore()}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
);

const render = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return rtlRender(ui, { wrapper: Wrapper });
};

test('full app rendering/navigating', async () => {
    render(<Index />);
    await waitFor(() => expect(screen.getByText(/Convertor of currencies/i)).toBeTruthy());
});

test('landing on a bad page', async () => {
    render(<Index />, { route: '/something-that-does-not-match' });
    await waitFor(() => expect(screen.getByText(/Not Found/i)).toBeTruthy());
});
