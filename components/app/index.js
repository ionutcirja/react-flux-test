import React, { Component } from 'react'
import Form from '../form'
import SubmittedList from '../submitted-list'
import FieldsStore from '../../stores/fields'
import SubmissionsStore from '../../stores/submissions'
import { connectToStores } from '../../connect-to-stores'

class App extends Component {

    render() {
        const submissions = this.props.submissions;

        return (
            <div>
                <Form fields={this.props.fields}/>
                {
                    submissions.length > 0 &&
                    <SubmittedList submissions={submissions} />
                }
            </div>
        );
    }
}

export default connectToStores(App, [FieldsStore, SubmissionsStore]);
