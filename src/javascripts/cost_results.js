import React, { Component } from 'react';

class Result extends Component {


    render() {

        var results = this.props.results.map( (result, i) => {

            var secs = result.estimated_duration_seconds;
            var mins = Math.round(secs / 60);

            var multiplier = result.primetime_percentage != "0%" ? (1 + result.primetime_percentage) : 1;
            var min_cents = result.estimated_cost_cents_min * multiplier;
            var min_dollars = min_cents / 100;

            var max_cents = result.estimated_cost_cents_max * multiplier;
            var max_dollars = max_cents / 100;

            return (
                <li key={i}>{result.is_valid_estimate ?
                    <div>
                        <h4>{result.display_name} : {mins} {mins > 1 ? 'minutes' : 'minute'}</h4>
                        <h3>Estimated Cost: ${min_dollars} to ${max_dollars} USD
                            {result.primetime_percentage != "0%" ?
                                <span> {result.primetime_percentage} with primetime pricing </span>
                                : null }
                        </h3>
                        <hr className="divider"/>
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
