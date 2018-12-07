import React, { Component } from 'react';
import {connect} from 'react-redux';

class Blank extends Component {
    constructor(props){
        super(props)
        this.props = props;
    }

    componentWillMount(){
        this.props.history.push(this.props.hash);
        // console.log(this.props.hash)
    }

    render() {
        return (
            <div className="blank">
              空白页
            </div>
        );
    }
}

export default connect((state)=>{
    
    return state
},(dispatch)=>{
    return {
        onIncreaseClick() {
            dispatch("increaseAction")
        }
    }
})(Blank);