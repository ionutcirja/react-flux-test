import React, { Component } from 'react'
import { addSubmission } from '../../actions/submissions'
import TextInputField from '../text-input-field'

class Form extends Component {

    onSubmit(evt) {
        if (evt) {
            evt.preventDefault();
        }

        addSubmission();
    }

    render() {

        return (
            <form className="form" onSubmit={this.onSubmit.bind(this)}>
                {
                    this.props.fields.map((field, index) => {
                        return (
                            <TextInputField
                                {...field}
                                key={index}
                            />
                        );
                    })
                }
                <input className="form__submit" type="submit" value="Submit"/>
            </form>
        );
    }
}

Form.propTypes = {
    fields: React.PropTypes.array.isRequired
};

export default Form;
