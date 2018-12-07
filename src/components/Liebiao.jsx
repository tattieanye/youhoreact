import React, { Component } from 'react';
// import Yfooter from '../components/Yfooter';
import { HashRouter as Router, Link } from "react-router-dom";
import Axios from 'axios';
class Liebiao extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            goodslist: [],

        }
    }
    setgoods(index, e) {
        // console.log(this.state.goodslist[index]);
        var obj = this.state.goodslist[index];

        localStorage.setItem('goods', JSON.stringify(obj));
    }
    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:3001/goods/getGoods',
            data: null
        })
            .then((res) => {
                // console.log(res.data.data.data);
                this.setState({ goodslist: res.data.data.data });
                // console.log(this.state.goodslist);
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        // console.log(this.state.goodslist);
        let liebiaoli = this.state.goodslist.map((item, index) => {
            return (
                <Link to="/details/" key={index} onClick={this.setgoods.bind(this, index)}>
                    <li>
                        <div className="goodsimg"><img src={item.imgpath} alt="" /></div>
                        <div className="goodsname">{item.name}</div>
                        <div className="goodsprice">
                            <span className="p1">￥{item.price}</span>
                        </div>
                    </li>
                </Link>
            )
        })
        // console.log(liebiaoli)
        // console.log(this.state.goodslist);
        return (
            <Router>
                <div className="liebiao">
                    <div className="liebiao-control">
                        <span>默认</span>
                        <span>新品</span>
                        <span>人气</span>
                        <span>价格</span>
                        <span>筛选</span>
                    </div>
                    <ul className="liebiaoul">
                        {/* {liebiaoli.length>0?liebiaoli:[<li key='1'>1</li>]} */}
                        {liebiaoli}
                    </ul>
                </div>
                {/* <Yfooter history={this.props.history}></Yfooter> */}

            </Router>
        );
    }
}

export default Liebiao;