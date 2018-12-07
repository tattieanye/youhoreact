import React, { Component } from 'react';
import Yfooter from '../components/Yfooter';
import Liebiao from '../components/Liebiao';
import { HashRouter as Router, Link } from "react-router-dom";
class Go extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            display:"none",
            show:true
        }
    }
    navboxshow(){
        console.log('666');
       this.setState(prevState =>({
           show:!prevState.show,
           display:prevState.show?'block':'none'
       }))
        console.log(this.state.show)
    }
    render() {
        
        return (
            <Router>
                <div className="go">
                    <div className="go-header">
                        <Link to="/boy/">
                            <div className="go-header-back">
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            </div>
                        </Link>
                        <span className="go-header-title">商品列表</span>
                        <div className="go-header-nav" onClick={this.navboxshow.bind(this)}>
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </div>
                        <div className="header-navbox" style={{ display: this.state.display }}>
                        </div>
                    </div>
                    <Liebiao></Liebiao>
                    <Yfooter history={this.props.history}></Yfooter>
                </div>
            </Router>
        );
    }
}
export default Go;