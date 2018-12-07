import React, { Component } from 'react';
import { HashRouter as Router, Link } from "react-router-dom";
class Details extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            display: "none",
            show: true,
            goodsdetails: null
        }
    }
    componentWillMount() {
        this.setState({ goodsdetails: JSON.parse(localStorage.getItem('goods')) })
    }
    navboxshow() {
        console.log('666');
        this.setState(prevState => ({
            show: !prevState.show,
            display: prevState.show ? 'block' : 'none'
        }))
        console.log(this.state.show)
    }
    render() {
        // console.log(this.state.goodsdetails)
        return (
            <div className="details">
                <div className="details-header">
                    <Link to="/go/">
                        <div className="details-header-back">
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </div>
                    </Link>
                    <span className="details-header-title">商品详情</span>
                    <div className="details-header-nav" onClick={this.navboxshow.bind(this)}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>

                    <div className="header-navbox" style={{ display: this.state.display }}>
                    </div>

                </div>
                <div className="details-img">
                    <img src={this.state.goodsdetails.imgpath} alt="" />
                </div>
                <div className="details-name">
                    <p>{this.state.goodsdetails.name}</p>
                </div>
                <div className="details-price">
                    <p>￥{this.state.goodsdetails.price}</p>
                </div>
                <div className="details-box1">
                    <p>
                        <span className="box1-sp1">促</span>
                        <span>全场￥129加价购</span>
                        <span>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
                <div className="details-box2">
                    <span>商品详情</span>
                    <span>购买咨询</span>
                </div>
                <div className="details-footer">
                    <span className="footer-icon">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <p>购物车</p>
                    </span>
                    <span className="footer-icon">
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                        <p>品牌店铺</p>
                    </span>
                    <span className="footer-icon">
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        <p>收藏</p>
                    </span>
                    <span className="footer-addcart">加入购物车</span>
                </div>
                {/* <Yfooter history={this.props.history}></Yfooter> */}
            </div>
        );
    }
}

export default Details;