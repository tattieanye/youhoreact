import React, { Component } from 'react';
import { HashRouter as Router, Link } from "react-router-dom";
// import { Route } from "react-router-dom";
// import '../home.less';
// import Boy from './Boy';


class App extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        // this.test = this.test.bind(this);
        this.state = {
            homenav: 0,
            homenavs: [
                // <li key='1'>男生 BOYS</li>,
                // <li key='2'>女生 GIRLS</li>,
                // <li key='3'>潮童 KIDS</li>,
                // <li key='4'>创意生活 LIFESTYLE</li>
                { title: "男生 BOYS", href: "/boy/" },
                { title: "女生 GIRLS", href: "/girl/" },
                { title: "潮童 KIDS", href: "/kid/" },
                { title: "创意生活 LIFESTYLE", href: "/life/" }
            ]
        }
    }
    goPages(index, e) {
        this.setState({
            homenav: index
        })
        console.log(this);
        this.props.history.push(this.state.homenavs[index].href)
    }
    test() {
        console.log(this.state.homenav);
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="index-header" onClick={this.test.bind(this)}><Link to="/boy"></Link></div>
                    <div className="index-body">
                        <div className="index-nav">
                            <ul>
                                {
                                    (() => {
                                        return this.state.homenavs.map((item, index) => {
                                            return (
                                                <li onClick={this.goPages.bind(this, index)} key={index} ><span>{item.title}</span></li>
                                            )
                                        })
                                    })()
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;