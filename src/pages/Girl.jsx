import React, { Component } from 'react';
import Yheader from '../components/Yheader';
import Banner from '../components/Banner';
import Yfooter from '../components/Yfooter';
// import { DatePicker } from 'antd'; 
// import {Button} from 'antd'
class Girl extends Component {
    render() {
        return (
            <div className="girl">
                <Yheader history={this.props.history}></Yheader>
                <Banner></Banner>
                <p>女生页面</p>
                {/* <DatePicker></DatePicker> */}
                {/* <Button type="danger"></Button> */}
                <Yfooter history={this.props.history}></Yfooter>
            </div>
        );
    }
}

export default Girl;