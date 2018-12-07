import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from './pages/Home';
import Boy from './pages/Boy';
import Girl from './pages/Girl';
import Kid from './pages/Kid';
import Life from './pages/Lifestyle';
import Fenlei from './pages/fenlei';
import Go from './pages/Go';
import Cart from './pages/Cart';
import User from './pages/User';
import Details from './pages/Details';
import Blank from './pages/blank';

// import logo from './logo.svg';
// import './App.css';
// import './App.less';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/boy/" component={Boy} />
        <Route path="/girl/" component={Girl} />
        <Route path="/kid/" component={Kid} />
        <Route path="/life/" component={Life} />
        <Route path="/fenlei/" component={Fenlei} />
        <Route path="/go/" component={Go} />
        <Route path="/cart/" component={Cart} />
        <Route path="/user/" component={User} />
        <Route path="/details/"  component={Details}/>
        <Route path="/blank/" component={Blank}/>
      </div>
    );
  }
}

export default App;
