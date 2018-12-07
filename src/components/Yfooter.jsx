import React, { Component } from 'react';
// import { HashRouter as Router } from "react-router-dom";
// import Blank from '../pages/blank';
import {connect} from 'react-redux';
class Yfooter extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        
        
        this.state = {
                footnavs: [
                    { name: "首页", href: "/boy/", icon: "fa fa-home" },
                    { name: "分类", href: "/fenlei/", icon: "fa fa-th-large" },
                    { name: "逛", href: "/go", icon: "fa fa-rocket" },
                    { name: "购物车", href: "/cart", icon: "fa fa-shopping-cart" },
                    { name: "我的", href: "/user", icon: "fa fa-user" }
                ],
                
        }
    }
   
    render() {
       
        return (
            <div className="Yfooter">
                <ul>
                    {
                        (() => {
                            return this.state.footnavs.map((item, index) => {
                                return (
                                    <li onClick={this.props.gofootPages.bind(this, index)} key={index}>
                                        <div className="footicon">
                                            <i className={item.icon} aria-hidden="true"></i>
                                        </div>
                                        <div className="footname">{item.name}</div>
                                    </li>
                                   
                                )
                            })
                        })()
                    }
                </ul> 
                {/* <Blank hash={this.state.hash}></Blank> */}
            </div>
        );
    }
}
export default connect((state)=>{
    // console.log(state.hash)
    return state
},(dispatch)=>{
    return{
        gofootPages(index,e){
            this.props.history.push('/blank');
            dispatch({
                type:"gofootPages",
                hash:this.state.footnavs[index].href
            })
        }
    }
})(Yfooter);