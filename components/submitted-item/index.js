import React, { Component } from 'react'

class SubmittedItem extends Component {

    render() {
        return (
            <li>
                <div>{this.props.advertiser} <span>--></span></div>
                <div>{this.props.brand} <span>--></span></div>
                <div>{this.props.product} <span>--></span></div>
                <ul>
                    {
                        this.props.dates.map((date, index) => {
                            return (
                                <li key={index}>{date}</li>
                            )
                        })
                    }
                </ul>
            </li>
        );
    }
}

SubmittedItem.propsTypes = {
    advertiser: React.PropTypes.string.isRequired,
    brand: React.PropTypes.string.isRequired,
    product: React.PropTypes.string.isRequired,
    dates: React.PropTypes.array.isRequired
};

export default SubmittedItem;
