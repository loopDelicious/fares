import React, { Component } from 'react';
import Result from './results.js';
import $ from 'jquery';

class Display extends Component {

    host = window.location.hostname;

    state = {
        oauth_token: null,
        results: null
    };

    handleGetOauth = () => {
        $.ajax({
            url: 'http://' + this.host + ':4500/',
            type: 'get',
            contentType: "application/json",
            success: (token) => {
                this.state.oauth_token = token.access_token;
            }
        });
    };

    handleForm = (e) => {
        e.preventDefault();

        var address = this.refs['address'].value;
        var data = {
            address: address,
            token: this.state.oauth_token,
        };

        $.ajax({
            url: 'http://' + this.host + ':4500/getEta',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (response) => {
                var lyft_response = response.eta_estimates;

                this.setState({
                    results: lyft_response
                });

                this.refs['user_form'].reset();
            }
        });
    };

    render() {
        return (
            <div>

                <button id="get-oauth" onClick={this.handleGetOauth}>Get Oauth</button><br/>
                <hr />
                <form id="address-input" ref="user_form" onSubmit={this.handleForm} >
                    <input type="text" placeholder="current address" ref="address" /><br/>
                    <button id="get-eta" type='submit' >Get ETA</button>
                </form>

                { this.state.results ? <Result results={this.state.results} /> : null }

            </div>
        )
    };
}

export default Display;
