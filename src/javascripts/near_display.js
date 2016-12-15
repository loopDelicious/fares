import React, { Component } from 'react';
import Result from './near_results.js';
import $ from 'jquery';

class Neardisplay extends Component {

    host = window.location.hostname;

    state = {
        results: null,
        location: null,
        error: null
    };

    handleForm = (e) => {
        e.preventDefault();

        var address = this.refs['address'].value;
        var google_data = {
            address: address,
        };

        if (address) {
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
                        url: 'http://' + this.host + ':4500/getNearby',
                        type: 'post',
                        data: JSON.stringify(lyft_data),
                        contentType: 'application/json',
                        success: (response) => {
                            var lyft_response = response.nearby_drivers;

                            this.setState({
                                results: lyft_response,
                                location: address,
                                error: null
                            });

                            this.refs['user_form'].reset();
                        }
                    });
                }
            });

        } else {

            this.setState({
                error: 'Please enter a Pickup Location.'
            });
        }
    };

    render() {
        return (
            <div>

                <form id="nearby-input" ref="user_form" onSubmit={this.handleForm} >
                    <input type="text" placeholder="pickup location" ref="address" /><br/>
                    {this.state.error ? <div><span>{this.state.error}</span><br/></div> : null}
                    <button id="get-nearby" type='submit' >See Nearby</button>
                </form>

                { this.state.results ? <Result results={this.state.results} location={this.state.location} /> : null }

            </div>
        )
    };
}

export default Neardisplay;
