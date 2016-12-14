import React, { Component } from 'react';
import $ from 'jquery';

class Oauth extends Component {

    host = window.location.hostname;

    state = {
        oauth_token: null,
    };

    componentDidMount() {
        this.handleGetOauth();
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
                {/*replace button click with componentDidMount to retrieve oauth token*/}
                {/*<button id="get-oauth" onClick={this.handleGetOauth}>Get Oauth</button><br/>*/}

            </div>
        )
    };
}

export default Oauth;
