import React, { Component } from 'react';
import Result from './cost_results.js';
import $ from 'jquery';

class Costdisplay extends Component {

    host = window.location.hostname;

    state = {
        results: null,
    };

    geocodeResponses = {};

    handleGeocode = (address, type) => {
        var google_data = {
            address: address
        };

        // geocode address to return lat-lng
        $.ajax({
            url: 'http://' + this.host + ':4500/geocode',
            type: 'post',
            data: JSON.stringify(google_data),
            contentType: 'application/json',
            success: (response) => {
                this.handleLyftCall(response, type);
            }
        });


    };

    handleLyftCall = (response, type) => {

        this.geocodeResponses[type] = response;

        if (this.geocodeResponses.start && this.geocodeResponses.end) {

            var lyft_data = {
                start_lat: this.geocodeResponses.start.lat,
                start_lng: this.geocodeResponses.start.lng,
                end_lat: this.geocodeResponses.end.lat,
                end_lng: this.geocodeResponses.end.lng,
                token: this.props.oauth
            };

            $.ajax({
                url: 'http://' + this.host + ':4500/getCost',
                type: 'post',
                data: JSON.stringify(lyft_data),
                contentType: 'application/json',
                success: (response) => {
                    var lyft_response = response.cost_estimates;

                    this.setState({
                        results: lyft_response
                    });

                    this.refs['user_form'].reset();
                }
            });
        }


    };

    handleForm = (e) => {
        e.preventDefault();

        var origin = this.refs['origin-address'].value;
        var destination = this.refs['destination-address'].value;

        this.handleGeocode(origin, 'start');
        this.handleGeocode(destination, 'end');

    };

    render() {
        return (
            <div>

                <form id="cost-input" ref="user_form" onSubmit={this.handleForm} >
                    <input type="text" placeholder="pickup location" ref="origin-address" /><br/>
                    <input type="text" placeholder="add destination" ref="destination-address" /><br/>
                    <button id="get-cost" type='submit' >Get Cost</button>
                </form>

                { this.state.results ? <Result results={this.state.results} /> : null }

            </div>
        )
    };
}

export default Costdisplay;
