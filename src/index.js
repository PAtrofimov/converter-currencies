import React from 'react';
import ReactDOM from 'react-dom';
import configureStore, { history } from './redux/configureStore';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import NotFound from './components/NotFound';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
