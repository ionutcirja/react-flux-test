import React, { Component } from 'react'
import SubmittedItem from '../submitted-item'

class SubmittedList extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.submissions.map((submission, index) => {
                        return (
                            <SubmittedItem {...submission} key={index}/>
                        )
                    })
                }
            </ul>
        );
    }
}

SubmittedList.propsTypes = {
    submissions: React.PropTypes.array.isRequired
};

export default SubmittedList;
