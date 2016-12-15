import React, { Component } from 'react';

class Result extends Component {


    render() {

        var results = this.props.results.map( (result, i) => {

            console.log(result);

            return (
                <li key={i}>
                    <div className="result clearfix">
                        <i className="fa fa-car" />
                        <div className="result-data">
                            <h4>{result.ride_type}: </h4>
                        </div>
                    </div>

                </li>
            )
        });

        return (
            <ul className="lyft-results">
                <h1>Drivers Located near {this.props.location}</h1>
                {results}
            </ul>
        )
    }
}

export default Result;
