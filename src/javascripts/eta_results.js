import React, { Component } from 'react';

class Result extends Component {


    render() {

        var results = this.props.results.map( (result, i) => {

            var secs = result.eta_seconds;
            var mins = secs / 60;

            return (
                <li key={i}>{result.is_valid_estimate ?
                    <div>
                        <h4>{result.display_name} : {mins} {mins > 1 ? 'minutes' : 'minute'}</h4>
                    </div>
                    : null }
                </li>
            )
        });

        return (
            <ul className="lyft-results">
                {results}
            </ul>
        )
    }
}

export default Result;
