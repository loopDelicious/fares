import React, { Component } from 'react';
import '../css/App.css';
import Oauth from './oauth.js';
import Costdisplay from './cost_display.js';
import Etadisplay from './eta_display.js';

class App extends Component {

    state = {
        oauth: null,
    };

    oauthVerification = (token) => {
        this.setState({
            oauth: token
        });
    };

    render() {
        return (
            <div className="App">
                <Oauth sendOauth={this.oauthVerification.bind(this)} />
                <hr />
                <Costdisplay oauth={this.state.oauth} />
                <hr />
                <Etadisplay oauth={this.state.oauth} />
            </div>
        );
    }
}

export default App;
