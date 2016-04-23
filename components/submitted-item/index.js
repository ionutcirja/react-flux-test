import React, { Component } from 'react'

class SubmittedItem extends Component {

    render() {
        return (
            <li className="submitted-item">
                <div className="submitted-item__field">{this.props.advertiser} <span>--></span></div>
                <div className="submitted-item__field">{this.props.brand} <span>--></span></div>
                <div className="submitted-item__field">{this.props.product} <span>--></span></div>
                <ul className="submitted-item__field">
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
