import React, { Component } from 'react'

export function connectToStores(ComponentClass, stores) {

    class StoreConnection extends Component {

        constructor(props) {
            super(props);
            this.state = this.getStateFromStores();
        }

        componentDidMount() {
            stores.forEach((store) => {
                store.addChangeListener(this.handleStoresChanged.bind(this));
            });
        }

        componentWillUnmount() {
            stores.forEach((store) => {
                store.removeChangeListener(this.handleStoresChanged);
            });
        }

        handleStoresChanged() {
            this.setState(this.getStateFromStores());
        }

        getStateFromStores () {
            let state = {};
            stores.forEach((store) => {
                state = Object.assign({}, {...state}, {...store.getState()});
            });

            return state;
        }

        render() {
            return <ComponentClass {...this.props} {...this.state} />;
        }
    }

    return StoreConnection;
}
