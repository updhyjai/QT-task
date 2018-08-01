import React from 'react';
import ReactDOM from 'react-dom';
import { requireAuth } from './utils/AuthService';
import Countries from './components/countries';
import Callback from './components/callback';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Home  from "./components/home";
import Nav from './components/nav';

const Root = () => {
    return (
        <div className="container">
        
            <Router history={createBrowserHistory()}>
            <div>
                    <Nav />
                <Route path="/" component={Home}/>
                    <Route path="/countries" component={Countries} />
                <Route path="/callback" component={Callback} />
                </div>
            </Router>
        </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));