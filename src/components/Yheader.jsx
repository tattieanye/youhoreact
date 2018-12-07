import React, { Component } from 'react';
import {connect} from 'react-redux';
// import Axios from 'axios';
// import '../styles/Yheader.less';
import Slider from './Slider';
class Yheader extends Component {
    constructor(props){
        super(props);
        this.props = props;
        // this.shownav = this.shownav.bind(this);
       
    }
    
   
    render() {
        return (
            <div className="Yheader">
                <div className="container">
                    <div className="Yheader-nav"  onClick={this.props.shownav.bind(this)}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    <div className="Yheader-title"></div>
                    <div className="Yheader-search">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div> 
                <Slider history={this.props.history}></Slider>
            </div>
           
        );
    }
}

export default connect((state)=>{
    return state
},(dispatch)=>{
    return {
        shownav(){
            dispatch({
                type:"shownav",
                navshow:!this.props.navshow
            })
            // console.log(this.props.navshow)
        }
    }
})(Yheader);