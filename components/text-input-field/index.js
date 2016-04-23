import React, { Component } from 'react'
import { setFieldValue } from '../../actions/fields'

class TextInputField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: this.props.error
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            error: nextProps.error
        }
    }

    onChange(evt) {
        setFieldValue(this.props.name, evt.target.value);
    }

    onFocus() {
        this.setState({
            error: ''
        });
    }

    render() {
        return (
            <div className="form__input-container">
                <label className="form__input-label" htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    className="form__input"
                    type="text"
                    name={this.props.name}
                    id={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                />
                {
                    this.state.error &&
                    <span className="form__input-error">{this.props.error}</span>
                }
            </div>
        );
    }
}

TextInputField.defaultProps = {
    value: ''
};

TextInputField.propsTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
};

export default TextInputField;
