import React, { Component } from 'react';
import Yfooter from '../components/Yfooter';
class User extends Component {
    render() {
        return (
            <div className="user">
                <p>用户中心页面</p>
                <Yfooter history={this.props.history}></Yfooter>
            </div>
        );
    }
}

export default User;