import React, { Component } from 'react';
import '../css/App.css';
import Oauth from './oauth.js';
import Nav from './nav.js';
import Costdisplay from './cost_display.js';
import Etadisplay from './eta_display.js';
import Neardisplay from './near_display.js';

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

                <Nav />

                {this.state.oauth ?

                <div className="other-apis">
                    <Etadisplay oauth={this.state.oauth} />
                    <hr />
                    <Neardisplay oauth={this.state.oauth} />
                    <hr />
                    <Costdisplay oauth={this.state.oauth} />
                    <hr />
                </div>

                : null}

            </div>
        );
    }
}

export default App;
