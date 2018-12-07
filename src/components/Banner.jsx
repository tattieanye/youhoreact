import React, { Component } from 'react';
import Swiper from 'swiper';
// import Axios from 'axios';
// import '../styles/banner.less';
import '../../node_modules/swiper/dist/css/swiper.css';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            imglist: [
                'https://img11.static.yhbimg.com/yhb-img01/2018/11/26/16/017eecea950170c8f6c7bfcde6de1cc207.jpg?imageView2/2/w/640/h/240/q/60',
                'https://img10.static.yhbimg.com/yhb-img01/2018/11/26/16/01c4767f15fd12986e283360690d407a1e.jpg?imageView2/2/w/640/h/240/q/60',
                'https://img11.static.yhbimg.com/yhb-img01/2018/11/26/16/019d4e915eedf830d5e14bfa213faf1bd0.jpg?imageView2/2/w/640/h/240/q/60',
                'https://img11.static.yhbimg.com/yhb-img01/2018/11/26/16/01928323338091bf01e365d4e9d0336351.jpg?imageView2/2/w/640/h/240/q/60',
                'https://img10.static.yhbimg.com/yhb-img01/2018/11/26/16/01663551ee94012fff03583414554b7355.jpg?imageView2/2/w/640/h/240/q/60'
            ]
        }
    }
    render() {
        return (
            <div className="banner">
                <div className="swiper-container bannerbox">
                    <div className="swiper-wrapper" >
                     
                        {
                            (() => {
                                return this.state.imglist.map((item, index) => {
                                    return (
                                        <div className="swiper-slide" key={index}>
                                            <img src={item} alt=""/>
                                        </div>
                                    )
                                })
                            })()
                        }
                    </div>
                    <div className="swiper-pagination test1"></div>
                    <img src="../img/lunbo1.jpg" alt=""/>
                </div>
                {/* <img src={require("../img/lunbo3.jpg")} alt=""/> */}
            </div>
        );
    }
    componentDidMount() {
        //实例化 swiper 需要获取元素内容所以 created 不能用  
        this.mySwiper = new Swiper('.bannerbox', {
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
                stopOnLastSlide: false,
                disableOnInteraction: false
            },
            // effect : 'cube',
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            }

        })
    }
    // componentWillUnmount(){

    // }


}

export default Banner;