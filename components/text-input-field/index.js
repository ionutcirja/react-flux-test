import React, { Component } from 'react'

class TextInputField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            error: this.props.error
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.error
        });
    }

    onChange(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    onFocus() {
        this.setState({
            error: ''
        });
    }

    getData() {
        return this.state.value;
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
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                />
                {
                    this.state.error &&
                    <span className="form__input-error">{this.state.error}</span>
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
