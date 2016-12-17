import React, { Component } from 'react';

class Result extends Component {


    render() {

        var results = this.props.results.map( (result, i) => {

            var locations = result.drivers.map( (cluster) => {
                return cluster.locations[0];
            }); // array of locations returning 1 car from each location cluster

            var coordinates = locations.map( (location) => {
               return (
                   <h5>{location.lat}, {location.lng}</h5>
               )
            });

            var rideTypes = result.ride_type.split('_').join(" ");

            return (
                <li key={i}>
                    <div className="result clearfix">
                        <i className="fa fa-car" />
                        <div className="result-data">
                            <h4 className="ride-type">{rideTypes}</h4>
                            {coordinates}
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
