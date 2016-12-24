import React, { Component } from 'react';

class Result extends Component {

    render() {

        return (
            <iframe src={`http:${this.props.shortcode}`} >
                <p>Your browser does not support iframes.</p>
            </iframe>
        )
    }
}

export default Result;
