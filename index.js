import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import style from './sass/main.scss'

render(
    <App />,
    document.getElementById('root')
);
