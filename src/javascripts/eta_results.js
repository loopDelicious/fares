import React, { Component } from 'react';

class Result extends Component {


    render() {

        var results = this.props.results.map( (result, i) => {

            var secs = result.eta_seconds;
            var mins = Math.round(secs / 60);

            return (
                <li key={i}>{result.is_valid_estimate ?
                    <div className="result clearfix">
                        <i className="fa fa-car" />
                        <div className="result-data">
                            <h4>{result.display_name} : {mins} {mins > 1 ? 'minutes' : 'minute'}</h4>
                        </div>
                    </div>
                    : null }
                </li>
            )
        });

        return (
            <ul className="lyft-results">
                <h1>Estimated Time of Arrival to {this.props.location}</h1>
                {results}
            </ul>
        )
    }
}

export default Result;
