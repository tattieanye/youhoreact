import React, { Component } from 'react';
import Yfooter from '../components/Yfooter';
import Yheader from '../components/Yheader';
import { connect } from 'react-redux';
class Fenlei extends Component {
    constructor(props){
        super(props)
        this.props = props;
    }
    render() {
        return (
            <div className="fenlei">
                <Yheader></Yheader>
                <p>分类页面</p>
                <p><button onClick={this.props.clickshow.bind(this)}>clickshow</button></p>
                <p><button onClick={this.props.addnum.bind(this)}>addnum</button></p>
                <p></p>
                <Yfooter history={this.props.history}></Yfooter>
            </div>
        );
    }
}

export default connect((state)=>{
    // console.log(state);
    return state
},(dispatch)=>{
    return{
        clickshow(){
            console.log(this.props.navshow);

            dispatch({
                type:"clickshow",
                navshow:!this.props.navshow
            })
            
        },
        addnum(){
            console.log(this.props.num);
            dispatch({
                type:"addnum",
                num:this.props.num*1 + 1
            })
        }
    }
})(Fenlei);