import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

class Mapbox extends Component {

    state = {
        results: this.props.results,
        viewport: {},
        nodes: null
    };

    // default mapbox.js API public access token
    mapboxToken = 'pk.eyJ1Ijoiam95Y2VsaW43OSIsImEiOiJjaW8zNzk5bHcwMDA5dzFrcXd6anpnY2xoIn0.ovObS9ODfNsnaa8ie--fKQ';


    componentDidMount() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            maxZoom: 20,
            layers: [
                L.tileLayer(
                    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false,
        });
    };

    componentDidUpdate() {

    };

    // TODO: common const, access token, viewport

    render() {

        // var latlng = [37.7749, -122.4194];

        // load base map of San Francisco
        // var map = L.map('map', {
        //     accessToken: this.mapboxToken,
        //     zoomControl: false,
        //     attributionControl: false,
        //     zoom: 12,  // starting zoom
        //     minZoom: 9, // farthest you can zoom out
        //     maxZoom: 16,  // closest you can zoom in
        //     center: latlng,  // starting position to center map on SF
        //     interactive: true, // make interactive instead of static
        // });
        // var map = L.map('map').setView([51.505, -0.09], 13);

        return (
            <div>
                <div className="map-canvas">
                    <div id="map">{this.map}</div>
                </div>

            </div>
        )
    }
}

export default Mapbox;
