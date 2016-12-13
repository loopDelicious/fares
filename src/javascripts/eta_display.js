import React, { Component } from 'react';
import Result from './eta_results.js';
import $ from 'jquery';

class Etadisplay extends Component {

    host = window.location.hostname;

    state = {
        results: null,
    };

    handleForm = (e) => {
        e.preventDefault();

        var address = this.refs['address'].value;
        var google_data = {
            address: address,
        };

        // geocode address to return lat-lng
        $.ajax({
            url: 'http://' + this.host + ':4500/geocode',
            type: 'post',
            data: JSON.stringify(google_data),
            success: (response) => {

                var lyft_data = {
                    lat: response.lat,
                    lng: response.lng,
                    token: this.props.oauth
                };

                // send lat-lng to return eta info
                $.ajax({
                    url: 'http://' + this.host + ':4500/getEta',
                    type: 'post',
                    data: JSON.stringify(lyft_data),
                    contentType: 'application/json',
                    success: (response) => {
                        var lyft_response = response.eta_estimates;

                        this.setState({
                            results: lyft_response
                        });

                        this.refs['user_form'].reset();
                    }
                });
            }
        });
    };

    render() {
        return (
            <div>

                <form id="eta-input" ref="user_form" onSubmit={this.handleForm} >
                    <input type="text" placeholder="current address" ref="address" /><br/>
                    <button id="get-eta" type='submit' >Get ETA</button>
                </form>

                { this.state.results ? <Result results={this.state.results} /> : null }

            </div>
        )
    };
}

export default Etadisplay;
