import React, { Component } from 'react';
import L from 'leaflet';
import $ from 'jquery';

class Mapbox extends Component {

    // default mapbox.js API public access token
    mapboxToken = 'pk.eyJ1Ijoiam95Y2VsaW43OSIsImEiOiJjaW8zNzk5bHcwMDA5dzFrcXd6anpnY2xoIn0.ovObS9ODfNsnaa8ie--fKQ';
    latlng = [37.7749, -122.4194];

    componentDidMount = () => {
        // console.log(this.props.start_coord); undefined
        var map = this.map = L.map('mapid').setView([this.props.geocode.start.lat, this.props.geocode.start.lng], 14);
        L.tileLayer('https://api.mapbox.com/styles/v1/joycelin79/ciwtz6lvp00o92qqo0t12lus8/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            zoomControl: false,
            center: this.latlng,
            interactive: false,
            accessToken: this.mapboxToken
        }).addTo(map);
        this.origin = L.marker([this.props.geocode.start.lat, this.props.geocode.start.lng]).addTo(map);
        this.destination = L.marker([this.props.geocode.end.lat, this.props.geocode.end.lng]).addTo(map);
        this.getDirections();
    };

    // TODO bound map with origin and destination

    getDirections = () => {

        var coords = {
            start_lat: this.props.geocode.start.lat,
            start_lng: this.props.geocode.start.lng,
            end_lat: this.props.geocode.end.lat,
            end_lng: this.props.geocode.end.lng
        };

        $.ajax({
            url: 'http://' + this.host + ':4500/getDirections',
            type: 'get',
            data: coords,
            contentType: 'application/json',
            success: (response) => {

            }
        });
    };

    render() {

        return (
            <div>
                <div className="map-canvas">
                    <div id="mapid">{this.map}</div>
                </div>

            </div>
        )
    }
}

export default Mapbox;


