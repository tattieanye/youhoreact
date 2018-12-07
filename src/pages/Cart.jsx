import React, { Component } from 'react';
import Yfooter from '../components/Yfooter';
class Cart extends Component {
    render() {
        return (
            <div className="cart">
                <p>购物车页面</p>
                <Yfooter history={this.props.history}></Yfooter>
            </div>
        );
    }
}

export default Cart;