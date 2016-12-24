import React, { Component } from 'react';
import $ from 'jquery';
import Result from './live_display.js';

class Tracker extends Component {

    host = window.location.hostname;

    state = {
        pin1: null,
        pin2: null,
        error: null,
        driver: null,
        selectedOption: 'walking',
        results: null,
        shortcode: 'trck.at/ERMLWD'

    };

    focus = true;

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleForm = (e) => {
        e.preventDefault();

        var origin = this.refs['origin-address'].value;
        var destination = this.refs['destination-address'].value;
        var hyper_data = {
            address: origin,
            destination: destination,
            vehicle_type: this.state.selectedOption,
        };

        if (origin && destination) {
            // create driver and task
            $.ajax({
                url: 'http://' + this.host + ':4500/setPin',
                type: 'post',
                data: JSON.stringify(hyper_data),
                contentType: 'application/json',
                success: (response) => {
                    this.setState({
                       results: response
                    });
                }
            });

        } else {

            this.setState({
                error: 'Please enter current and destination locations.'
            });
        }
    };

    render() {

        return (
            <div>
                {this.state.results == null ?
                    <div className="container">
                        <form id="pin1-input" ref="user_form" onSubmit={this.handleForm} >
                            <input type="text" placeholder="set current location" ref="origin-address" autoFocus={this.focus} /><br/>
                            <input type="text" placeholder="add destination" ref="destination-address" /><br/>


                            {this.state.error ? <div><span>{this.state.error}</span><br/></div> : null}

                            <div className="radio-buttons">
                                <label className="radio-inline"><input type="radio" name="mode" value="walking"
                                   checked={this.state.selectedOption === 'walking'}
                                   onChange={this.handleOptionChange}
                                /> walking</label>

                                <label className="radio-inline"><input type="radio" name="mode" value="bicycle"
                                   checked={this.state.selectedOption === 'bicycle'}
                                   onChange={this.handleOptionChange}
                                /> cycling</label>

                                <label className="radio-inline"><input type="radio" name="mode" value="car"
                                   checked={this.state.selectedOption === 'car'}
                                   onChange={this.handleOptionChange}
                                /> driving</label>
                            </div>

                            <button id="start-1" type='submit' >Start my Trip</button>
                        </form>
                    </div>
                :
                    <Result shortcode={this.state.shortcode} />
                }
            </div>

        )
    };
}

export default Tracker;
