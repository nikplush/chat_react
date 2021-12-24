import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import 'rsuite/dist/rsuite.min.css'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
