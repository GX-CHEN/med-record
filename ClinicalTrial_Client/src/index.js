import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Report from './components/report_index'
import ReportConfirm from './components/report_confirm'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/confirm" component={ReportConfirm} />
                    <Route path="/" component={Report} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
, document.querySelector('.container'))