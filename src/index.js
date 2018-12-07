import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/comment/reset.less';
import { HashRouter as Router } from "react-router-dom";
import './styles/index.less';
import './static/fontnew/iconfont.css';
import './static/css/font-awesome.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


const store = createStore((state = {
    navshow:true,
    num:0,
    hash:''





}, action) => {
    switch (action.type) {
        case 'clickshow':
            return{
                ...state,
                navshow:action.navshow
            }
        case 'addnum':
            return{
                ...state,
                num:action.num
            }
        case 'gofootPages':
            return{
                ...state,
                hash:action.hash
            }
        case 'shownav':
            return{
                ...state,
                navshow:action.navshow
            }
        case 'allhide':
            return{
                ...state,
                navshow:action.navshow
            }
        default:
            return state
    }
})
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
