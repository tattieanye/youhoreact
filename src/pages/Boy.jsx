import React, { Component } from 'react';
import Axios from 'axios';
// import { Route } from "react-router-dom";
import { HashRouter as Router, Link } from "react-router-dom";
import Yheader from '../components/Yheader';
import Banner from '../components/Banner';
import Yfooter from '../components/Yfooter';
class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1list: [
                { imgurl: require("../img/nav1img1.png"), name: "新品到著" },
                { imgurl: require("../img/nav1img2.png"), name: "人气搭配" },
                { imgurl: require("../img/nav1img3.png"), name: "折扣专区" },
                { imgurl: require("../img/nav1img4.png"), name: "全部分类" }
            ],
            hotnavlist: [
                require('../img/hotimg1.jpg'),
                require('../img/hotimg2.jpg'),
                require('../img/hotimg3.jpg'),
                require('../img/hotimg4.jpg'),
                require('../img/hotimg5.jpg'),
                require('../img/hotimg6.jpg'),
                require('../img/hotimg7.jpg'),
                require('../img/hotimg8.jpg'),
                require('../img/hotimg9.jpg'),
                require('../img/hotimg10.jpg'),
                require('../img/hotimg11.jpg'),
                require('../img/hotimg12.jpg')
            ],
            pinpailist: [
                '../img/pinpai1.jpg',
                require('../img/pinpai2.jpg'),
                require('../img/pinpai3.jpg'),
                require('../img/pinpai4.jpg'),
                require('../img/pinpai5.jpg'),
                require('../img/pinpai6.jpg'),
            ],
            toplist:[]
        }
    }
    // componentWillMount(){
        
    // }
    componentDidMount(){
        Axios({
            method: 'get',
            url: 'http://localhost:3001/goods/getGoods',
            data: null
        })
        .then((res) => {
            // console.log(res.data.data.data);
            this.setState({ toplist: res.data.data.data });
            console.log(this.state.toplist);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render() {
        let nav1li = this.state.nav1list.map((item, index) => {
            return (
                <Link to="/fenlei" key={index}>
                    <li>
                        <img src={item.imgurl} alt="" />
                        <p className="nav1p"><span>{item.name}</span></p>
                    </li>
                </Link>
            )
        })
        let hotnavli = this.state.hotnavlist.map((item, index) => {
            return (
                <li key={index}>
                    <img src={item} alt="" />
                </li>
            )
        })
        let pinpaili = this.state.pinpailist.map((item, index) => {
            return (
                <li className="pinpaili" key={index}>
                    <img src={item} alt="" />
                </li>
            )
        })
        let topli = this.state.toplist.map((item,index)=>{
            return (
                <li key={index}>
                    <div className="topimg"><img src={item.imgpath} alt=""/></div>
                    <p>￥{item.price}</p>
                    <p>115人</p>
                    <p>正在浏览</p>
                </li>
            )
        })
        return (
            <Router>
                <div className="boy">
                    <Yheader history={this.props.history}></Yheader>
                    <Banner></Banner>
                    <div className="bodybox">
                        <div className="nav1">
                            <ul className="nav1ul">
                                {nav1li}
                            </ul>
                        </div>
                        <div className="showimg1"><img src={require("../img/showimg1.png")} alt="" /></div>
                        <div className="showimg1"><img src={require("../img/showimg2.png")} alt="" /></div>
                        <p className="p-hot">热门品类</p>
                        <div className="hotnavbox">
                            <ul className="hotnavul">
                                {hotnavli}
                            </ul>
                        </div>
                        <div className="showimg1"><img src={require("../img/showimg3.jpg")} alt="" /></div>
                        <p className="p-hot">热门品牌</p>
                        <div className="pinpaibox">
                            <ul className="pinpaiul">
                                {pinpaili}
                                <li className="li-more">
                                    <img src={require("../img/pinpaimroe.png")} alt="" />
                                </li>
                            </ul>
                        </div>
                        <div className="showimg1"><img src={require("../img/showimg4.jpg")} alt="" /></div>
                        <p className="p-hot">人气推荐</p>
                        <div className="showimg1"><img src={require("../img/top100.jpg")} alt="" /></div>
                        <div className="topbox">
                            <ul className="topul">
                               {topli}
                            </ul>
                        </div>
                        <p className="p-like">
                            <i className="fa fa-arrow-circle-up" aria-hidden="true"><strong>你可能喜欢</strong></i>
                        </p>
                        
                    </div>
                    <Yfooter history={this.props.history}></Yfooter>
                </div>
            </Router>
        );
    }
}
export default Boy;