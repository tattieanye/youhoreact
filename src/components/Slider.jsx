import React, { Component } from 'react';
import {connect} from 'react-redux';
class Slider extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            display: "none",
            navlist: [
                {
                  name: "男生",
                  eng: "BOYS",
                  imgurl: require("../img/boy.png"),
                  path: "/boy"
                },
                {
                  name: "女生",
                  eng: "GIRLS",
                  imgurl: require("../img/girl.png"),
                  path: "/girl"
                },
                {
                  name: "童装",
                  eng: "KIDS",
                  imgurl: require("../img/kid.png"),
                  path: "/kid"
                },
                {
                  name: "创意生活",
                  eng: "LIFE  STYLE",
                  imgurl: require("../img/life.png"),
                  path: "/life"
                },
                {
                  name: "逛",
                  eng: "TRENDFINDER",
                  imgurl: require("../img/shop.png"),
                  path: "/go"
                }
              ],
        }
    }
    // allhide() {
    //     this.setState({ display: "none" })
    // }
    componentWillReceiveProps(){
        console.log(this.props.navshow)
        if(this.props.navshow === true){
            this.setState({ display: "block" })
        }else if(this.props.navshow === false){
            this.setState({ display: "none" })
        }
    }

  
    goslider(index,e){
        console.log(index);
        this.setState({ display: "none" });
        this.props.history.push(this.state.navlist[index].path);
    }
    render() {
        return (
            <div className="slider">
                {/* <CSSTransitionGroup> */}  
                    <ul style={{ display:this.state.display }} onClick={this.props.allhide.bind(this)}>
                        {
                            (()=>{
                                return this.state.navlist.map((item,index)=>{
                                    return(
                                        <li onClick={this.goslider.bind(this, index)} key={index}>
                                            <span><img src={item.imgurl} alt=""/></span>
                                            <span>{item.name}</span>
                                            <span>{item.eng}</span>
                                        </li>
                                    )
                                })
                            })()
                        }
                    </ul>
                {/* </CSSTransitionGroup> */}
                <div className="mask" onClick={this.props.allhide.bind(this)}
                    style={{ display:this.state.display }}>
                </div>
            </div>
        );
    }
}

export default connect((state)=>{
    // console.log(state.navshow)
    return state
},(dispatch)=>{
    return {
        allhide(){
            this.setState({ display: "none" });
            dispatch({
                type:"allhide",
                navshow:true
            })
        }
    }
})(Slider);