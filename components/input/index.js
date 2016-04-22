import React, { Component } from 'react'

class Input extends Component {

    render() {
        return (
            <div>
                <input
                    name={this.props.name}
                    id={this.props.name}
                    placeholder=""
                />
            </div>
        );
    }
}

export default Input;
