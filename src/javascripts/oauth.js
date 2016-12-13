import React, { Component } from 'react';
import $ from 'jquery';

class Oauth extends Component {

    host = window.location.hostname;

    state = {
        oauth_token: null,
    };

    handleGetOauth = () => {
        $.ajax({
            url: 'http://' + this.host + ':4500/',
            type: 'get',
            contentType: "application/json",
            success: (token) => {
                this.props.sendOauth(token.access_token);
            }
        });
    };


    render() {
        return (
            <div>

                <button id="get-oauth" onClick={this.handleGetOauth}>Get Oauth</button><br/>

            </div>
        )
    };
}

export default Oauth;
