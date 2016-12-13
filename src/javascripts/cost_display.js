import React, { Component } from 'react';
import Result from './cost_results.js';
import $ from 'jquery';

class Costdisplay extends Component {

    host = window.location.hostname;

    state = {
        results: null,
    };

    handleGeocode = (address) => {
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

                return response;
            }
        });
    };

    handleForm = (e) => {
        e.preventDefault();

        var origin = this.refs['origin-address'].value;
        var destination = this.refs['destination-address'].value;

        var start_coord = this.handleGeocode(origin);
        var end_coord = this.handleGeocode(destination);

        console.log(typeof(start_coord));
        console.log(end_coord);

        // var lyft_data = {
        //     start_lat: start_coord.lat,
        //     start_lng: start_coord.lng,
        //     end_lat: end_coord.lat,
        //     end_lng: end_coord.lng
        // };

        // $.ajax({
        //     url: 'http://' + this.host + ':4500/getCost',
        //     type: 'post',
        //     data: JSON.stringify(lyft_data),
        //     contentType: 'application/json',
        //     success: (response) => {
        //         var lyft_response = response.cost_estimates;
        //
        //         this.setState({
        //             results: lyft_response
        //         });
        //
        //         this.refs['user_form'].reset();
        //     }
        // });
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
