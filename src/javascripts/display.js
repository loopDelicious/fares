import React, { Component } from 'react';
import $ from 'jquery';

class Display extends Component {

    host = window.location.hostname;

    handleGetOauth = () => {
        $.ajax({
            url: 'http://' + this.host + ':4500/',
            type: 'get',
            contentType: "application/json",
            success: (token) => {
                console.log(token);
            }
        });
    };

    render() {
        return (
            <div>
                <h1>hello</h1>
                <button id="get-oautb" onClick={this.handleGetOauth}>Get Oauth</button>
            </div>
        )
    };
}

export default Display;
