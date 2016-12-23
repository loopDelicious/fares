import React, { Component } from 'react';
import $ from 'jquery';

class Tracker extends Component {

    host = window.location.hostname;

    state = {
        pin1: null,
        pin2: null,
        error: null,
        driver: null,
        selectedOption: 'walking'

    };

    focus = true;

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleForm = (e) => {
        e.preventDefault();

        var address = this.refs['address'].value;
        var hyper_data = {
            address: address,
            vehicle_type: this.state.selectedOption,
        };

        if (address) {
            // create driver
            $.ajax({
                url: 'http://' + this.host + ':4500/setPin',
                type: 'post',
                data: JSON.stringify(hyper_data),
                contentType: 'application/json',
                success: (response) => {
                    var driver_id = response.id;
                }
            });

        } else {

            this.setState({
                error: 'Please enter a Pickup Location.'
            });
        }
    };

    render() {

        return (
            <div>
                {this.state.pin1 ?
                    <iframe src="http://www.eta.fyi/SRUlR2">
                        <p>Your browser does not support iframes.</p>
                    </iframe>
                :
                    <div className="container">
                        <form id="pin1-input" ref="user_form" onSubmit={this.handleForm} >

                            <input type="text" placeholder="set current location" ref="address" autoFocus={this.focus}/>

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

                            <button id="set-pin1" type='submit' >Set My Pin</button>
                        </form>
                    </div>
                }
            </div>

        )
    };
}

export default Tracker;
